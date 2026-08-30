# ShopMyUniform

A full-stack school-uniform e-commerce platform built using the MERN stack with an integrated AI Customer Support Agent powered by Google Gemini.

ShopMyUniform allows parents and students to select their school, browse uniforms and accessories, search products, manage their cart, place orders, and track existing orders. The AI support agent can answer product, sizing, delivery, order, and return/exchange questions using real application data from MongoDB.

---

## 🚀 Features

### 👤 Authentication & User Profile
- User registration and login
- JWT-based authentication
- Protected routes
- Student/parent profile information
- School selection

### 🏫 School-based Shopping
- Browse products by school
- School-specific uniform catalog
- Multiple product categories
- Product filtering by school, category, gender, and search query

### 🛍️ Product Catalog
- Product listing
- Product search
- Product details
- Product descriptions and pricing
- Available sizes and stock information
- Size guide
- School-specific products

### 🛒 Cart & Checkout
- Add products to cart
- Select product sizes
- Update quantities
- Remove products
- Checkout
- Order creation

### 📦 Order Management
- View previous orders
- View individual order details
- Order status
- Expected delivery date
- Order status history

### 🤖 AI Customer Support Agent
The application includes an AI-powered customer support agent using Google Gemini.

The agent can handle:

- Product availability
- Product recommendations
- Product details
- Size and fitting questions
- Order status
- Delivery information
- Return and exchange policy
- Follow-up questions using conversation history

The AI does **not** use hardcoded order or product responses.

Instead, it can call backend tools that retrieve the required information directly from MongoDB.

---

# 🧠 AI Architecture

The AI agent follows a tool-calling architecture.

```text
User
  │
  ▼
React Chat Interface
  │
  ▼
Chat API
  │
  ▼
AI Agent
  │
  ├── search_products
  ├── get_product_details
  ├── get_size_guide
  ├── get_my_orders
  ├── get_order_details
  ├── get_delivery_info
  └── get_return_policy
          │
          ▼
      MongoDB
          │
          ▼
      Tool Result
          │
          ▼
       Gemini
          │
          ▼
     Final Response
