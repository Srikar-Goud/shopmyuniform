import Product from "../models/Product.js";
import Order from "../models/Order.js";
import School from "../models/School.js";

// ---------------------------------------------------------------------------
// These are the "functions" the AI agent is allowed to call. Every function
// that touches user-specific data (orders, delivery) takes `userId` from the
// authenticated request (req.user.id) — it is injected by the chat
// controller, NEVER read from the model's tool-call arguments. This is what
// stops the agent from ever being tricked into fetching someone else's data.
// ---------------------------------------------------------------------------

export async function searchProducts({ query, school, category, gender }) {
  const filter = { isActive: true };
  if (school) {
    const schoolDoc = await School.findOne({ name: new RegExp(school, "i") });
    if (schoolDoc) filter.school = schoolDoc._id;
  }
  if (category) filter.category = new RegExp(`^${category}$`, "i");
  if (gender) filter.gender = gender;
  if (query) filter.$text = { $search: query };

  const products = await Product.find(filter).populate("school", "name").limit(8);

  return products.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    school: p.school?.name,
    category: p.category,
    gender: p.gender,
    price: p.price,
    sizesAvailable: p.sizes.filter((s) => s.stock > 0).map((s) => s.label),
  }));
}

export async function getProductDetails({ productId }) {
  const p = await Product.findById(productId).populate("school", "name");
  if (!p) return { error: "Product not found" };
  return {
    id: p._id.toString(),
    name: p.name,
    description: p.description,
    school: p.school?.name,
    category: p.category,
    gender: p.gender,
    price: p.price,
    sizes: p.sizes.map((s) => ({ label: s.label, stock: s.stock, chestIn: s.chestIn, heightCm: s.heightCm })),
    sizeGuideNotes: p.sizeGuideNotes,
  };
}

export async function getSizeGuide({ productId }) {
  const p = await Product.findById(productId);
  if (!p) return { error: "Product not found" };
  return {
    name: p.name,
    sizeGuideNotes: p.sizeGuideNotes || "No specific size notes for this item; refer to chest/height columns.",
    sizes: p.sizes.map((s) => ({ label: s.label, chestIn: s.chestIn, heightCm: s.heightCm, inStock: s.stock > 0 })),
  };
}

// userId is injected by the server — the model never supplies it.
export async function getUserOrders({ userId }) {
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).limit(10);
  return orders.map(summarizeOrder);
}

export async function getOrderDetails({ userId, orderNumber }) {
  const order = await Order.findOne({ user: userId, orderNumber });
  if (!order) return { error: `No order ${orderNumber} found on this account.` };
  return summarizeOrder(order, true);
}

export async function getDeliveryInfo({ userId, orderNumber }) {
  const order = await Order.findOne({ user: userId, orderNumber });
  if (!order) return { error: `No order ${orderNumber} found on this account.` };
  return {
    orderNumber: order.orderNumber,
    status: order.status,
    expectedDeliveryDate: order.expectedDeliveryDate,
    deliveredAt: order.deliveredAt,
  };
}

export async function getReturnPolicy() {
  return {
    windowDays: 15,
    condition: "Unworn, unwashed, with original tags attached.",
    eligibility: "Available once an order status is Delivered. Not applicable to customized name-tag items.",
    process:
      "Ask the customer support agent to raise a return/exchange, or use the 'Return / Exchange' button on the order details page. A pickup is scheduled within 2-3 business days.",
    refundTimeline: "5-7 business days after the item passes quality check at the warehouse.",
  };
}

function summarizeOrder(order, detailed = false) {
  const base = {
    orderNumber: order.orderNumber,
    status: order.status,
    total: order.total,
    placedAt: order.createdAt,
    expectedDeliveryDate: order.expectedDeliveryDate,
  };
  if (detailed) {
    base.items = order.items.map((i) => ({ name: i.name, size: i.size, quantity: i.quantity, price: i.price }));
    base.statusHistory = order.statusHistory;
  }
  return base;
}
