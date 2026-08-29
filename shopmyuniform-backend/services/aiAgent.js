import Anthropic from "@anthropic-ai/sdk";
import {
  searchProducts,
  getProductDetails,
  getSizeGuide,
  getUserOrders,
  getOrderDetails,
  getDeliveryInfo,
  getReturnPolicy,
} from "./tools.js";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

// ---------------------------------------------------------------------------
// Tool schema exposed to the model. Note there is no "userId" parameter on
// any of the order/delivery tools - the model can never ask for a specific
// user's data because it cannot supply a user id at all. We inject it
// server-side when we execute the tool.
// ---------------------------------------------------------------------------
const toolDefinitions = [
  {
    name: "search_products",
    description:
      "Search the product catalog by free-text query, school name, category, and/or gender. Use this when the customer asks whether something is available or wants recommendations.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Free text search, e.g. 'white shirt'" },
        school: { type: "string", description: "School name, e.g. 'St. Mary's School'" },
        category: {
          type: "string",
          enum: ["Shirt", "Trousers", "Skirt", "Pinafore", "Tie", "Sweater", "Blazer", "Shoes", "PE Kit", "Accessory"],
        },
        gender: { type: "string", enum: ["boy", "girl", "unisex"] },
      },
    },
  },
  {
    name: "get_product_details",
    description: "Get full details (price, description, available sizes) for a specific product by its id.",
    input_schema: {
      type: "object",
      properties: { productId: { type: "string" } },
      required: ["productId"],
    },
  },
  {
    name: "get_size_guide",
    description: "Get the size chart / fit guidance for a specific product by its id.",
    input_schema: {
      type: "object",
      properties: { productId: { type: "string" } },
      required: ["productId"],
    },
  },
  {
    name: "get_my_orders",
    description: "Get the authenticated customer's own recent orders (order number, status, total, dates). No parameters needed - it is always scoped to whoever is logged in.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "get_order_details",
    description: "Get full details of one of the authenticated customer's own orders by order number (e.g. 'SMU1024').",
    input_schema: {
      type: "object",
      properties: { orderNumber: { type: "string" } },
      required: ["orderNumber"],
    },
  },
  {
    name: "get_delivery_info",
    description: "Get delivery/shipping status and expected delivery date for one of the authenticated customer's own orders.",
    input_schema: {
      type: "object",
      properties: { orderNumber: { type: "string" } },
      required: ["orderNumber"],
    },
  },
  {
    name: "get_return_policy",
    description: "Get the store's return/exchange policy (window, conditions, refund timeline).",
    input_schema: { type: "object", properties: {} },
  },
];

// Executes a tool call. `userId` always comes from the authenticated
// request (see chatController.js), never from `input`.
async function executeTool(name, input, userId) {
  switch (name) {
    case "search_products":
      return searchProducts(input);
    case "get_product_details":
      return getProductDetails(input);
    case "get_size_guide":
      return getSizeGuide(input);
    case "get_my_orders":
      return getUserOrders({ userId });
    case "get_order_details":
      return getOrderDetails({ userId, orderNumber: input.orderNumber });
    case "get_delivery_info":
      return getDeliveryInfo({ userId, orderNumber: input.orderNumber });
    case "get_return_policy":
      return getReturnPolicy();
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

const SYSTEM_PROMPT = `You are the ShopMyUniform customer support agent, embedded in a school-uniform e-commerce site.

Rules:
- Never invent product, order, price, or delivery information. Always call a tool to look up real data before answering a question about the catalog, sizes, orders, delivery, or returns.
- You only ever have access to the currently logged-in customer's own orders. You cannot look up another person's orders under any circumstances, and you don't need to ask for a user id - the tools already know who is asking.
- If a lookup returns no result, say so plainly rather than guessing.
- Keep answers short, warm, and specific (mention order numbers, sizes, dates, prices from the tool results).
- For general questions unrelated to the store, gently redirect to how you can help with products, sizing, orders, delivery, or returns.`;

// history: [{role:'user'|'assistant', content:string}, ...] (prior turns)
// message: the new user message (string)
// userId: authenticated user's Mongo _id as string
export async function runAgent({ history, message, userId }) {
  const messages = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: message },
  ];

  // Tool-use loop: keep calling the model until it returns a plain text answer.
  for (let turn = 0; turn < 6; turn++) {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: toolDefinitions,
      messages,
    });

    const toolUseBlocks = response.content.filter((b) => b.type === "tool_use");

    if (toolUseBlocks.length === 0) {
      const textBlock = response.content.find((b) => b.type === "text");
      return textBlock ? textBlock.text : "I'm not sure how to help with that - could you rephrase?";
    }

    // Model wants to use tools: execute them, then continue the conversation.
    messages.push({ role: "assistant", content: response.content });

    const toolResults = await Promise.all(
      toolUseBlocks.map(async (block) => {
        const result = await executeTool(block.name, block.input || {}, userId);
        return {
          type: "tool_result",
          tool_use_id: block.id,
          content: JSON.stringify(result),
        };
      })
    );

    messages.push({ role: "user", content: toolResults });
  }

  return "Sorry, I'm having trouble completing that request right now. Please try again in a moment.";
}
