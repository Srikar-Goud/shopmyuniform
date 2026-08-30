import { GoogleGenAI, Type } from "@google/genai";

import {
  searchProducts,
  getProductDetails,
  getSizeGuide,
  getUserOrders,
  getOrderDetails,
  getDeliveryInfo,
  getReturnPolicy,
} from "./tools.js";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

// ---------------------------------------------------------------------------
// Gemini function declarations
// ---------------------------------------------------------------------------

const toolDefinitions = [
  {
    name: "search_products",
    description:
      "Search the product catalog by free-text query, school name, category, and/or gender. Use this when the customer asks whether something is available or wants recommendations.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: {
          type: Type.STRING,
          description: "Free text search, e.g. 'white shirt'",
        },
        school: {
          type: Type.STRING,
          description: "School name, e.g. 'St. Mary's School'",
        },
        category: {
          type: Type.STRING,
          enum: [
            "Shirt",
            "Trousers",
            "Skirt",
            "Pinafore",
            "Tie",
            "Sweater",
            "Blazer",
            "Shoes",
            "PE Kit",
            "Accessory",
          ],
        },
        gender: {
          type: Type.STRING,
          enum: ["boy", "girl", "unisex"],
        },
      },
    },
  },

  {
    name: "get_product_details",
    description:
      "Get full details including price, description, school, and available sizes for a specific product by its ID.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        productId: {
          type: Type.STRING,
          description: "MongoDB product ID",
        },
      },
      required: ["productId"],
    },
  },

  {
    name: "get_size_guide",
    description:
      "Get the size chart and fit guidance for a specific product.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        productId: {
          type: Type.STRING,
          description: "MongoDB product ID",
        },
      },
      required: ["productId"],
    },
  },

  {
    name: "get_my_orders",
    description:
      "Get the authenticated customer's own recent orders. No parameters are required because the server automatically identifies the logged-in customer.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },

  {
    name: "get_order_details",
    description:
      "Get full details of one of the authenticated customer's own orders by order number.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        orderNumber: {
          type: Type.STRING,
          description: "Order number such as SMU1024",
        },
      },
      required: ["orderNumber"],
    },
  },

  {
    name: "get_delivery_info",
    description:
      "Get delivery status and expected delivery date for one of the authenticated customer's own orders.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        orderNumber: {
          type: Type.STRING,
          description: "Order number such as SMU1024",
        },
      },
      required: ["orderNumber"],
    },
  },

  {
    name: "get_return_policy",
    description:
      "Get the store's return and exchange policy including return window, conditions, and refund timeline.",
    parameters: {
      type: Type.OBJECT,
      properties: {},
    },
  },
];

// ---------------------------------------------------------------------------
// Execute tool
// ---------------------------------------------------------------------------

async function executeTool(name, input, userId) {
  switch (name) {
    case "search_products":
      return await searchProducts(input);

    case "get_product_details":
      return await getProductDetails(input);

    case "get_size_guide":
      return await getSizeGuide(input);

    case "get_my_orders":
      return await getUserOrders({ userId });

    case "get_order_details":
      return await getOrderDetails({
        userId,
        orderNumber: input.orderNumber,
      });

    case "get_delivery_info":
      return await getDeliveryInfo({
        userId,
        orderNumber: input.orderNumber,
      });

    case "get_return_policy":
      return await getReturnPolicy();

    default:
      return {
        error: `Unknown tool: ${name}`,
      };
  }
}

// ---------------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `
You are the ShopMyUniform customer support agent, embedded in a school-uniform e-commerce site.

Rules:

- Never invent product, order, price, size, stock, or delivery information.
- Always call the appropriate tool when answering questions about products, sizes, orders, delivery, or returns.
- You only have access to the currently logged-in customer's own orders.
- Never ask the customer for a user ID.
- The server automatically provides the authenticated user's ID to order-related tools.
- If a lookup returns no result, say so plainly instead of guessing.
- Keep answers short, warm, and specific.
- Mention actual product names, order numbers, sizes, dates, prices, and statuses returned by tools.
- For unrelated questions, gently redirect the customer toward products, sizing, orders, delivery, or returns.
`;

// ---------------------------------------------------------------------------
// Main agent
// ---------------------------------------------------------------------------

export async function runAgent({ history, message, userId }) {
  const contents = [
    ...history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: m.content,
        },
      ],
    })),

    {
      role: "user",
      parts: [
        {
          text: message,
        },
      ],
    },
  ];

  const config = {
    systemInstruction: SYSTEM_PROMPT,

    tools: [
      {
        functionDeclarations: toolDefinitions,
      },
    ],
  };

  // Tool-use loop
  for (let turn = 0; turn < 6; turn++) {
    const response = await gemini.models.generateContent({
      model: MODEL,
      contents,
      config,
    });

    // Gemini may request one or multiple functions.
    const functionCalls = response.functionCalls || [];

    // No function call = final answer
    if (functionCalls.length === 0) {
      return (
        response.text ||
        "I'm not sure how to help with that. Could you rephrase?"
      );
    }

    // IMPORTANT:
    // Preserve Gemini's complete response content, including function calls
    // and any thought signatures required by Gemini 3.
    contents.push(response.candidates[0].content);

    // Execute every requested function
    const functionResponses = [];

    for (const call of functionCalls) {
      const result = await executeTool(
        call.name,
        call.args || {},
        userId
      );

      functionResponses.push({
        functionResponse: {
          name: call.name,
          response: {
            result,
          },
          id: call.id,
        },
      });
    }

    // Send tool results back to Gemini
    contents.push({
      role: "user",
      parts: functionResponses,
    });
  }

  return "Sorry, I'm having trouble completing that request right now. Please try again in a moment.";
}