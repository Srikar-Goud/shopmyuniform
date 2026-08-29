import mongoose from "mongoose";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const generateOrderNumber = async () => {
  const count = await Order.countDocuments();
  return `SMU${1000 + count + 1}`;
};

// POST /api/orders/checkout  { shippingAddress }
export const checkout = async (req, res, next) => {
  try {
    const { shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const orderItems = [];
    let total = 0;

    for (const item of cart.items) {
      const product = item.product;
      const sizeEntry = product.sizes.find((s) => s.label === item.size);
      if (!sizeEntry || sizeEntry.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} (size ${item.size}) no longer has enough stock`,
        });
      }
      orderItems.push({
        product: product._id,
        name: product.name,
        size: item.size,
        quantity: item.quantity,
        price: item.priceAtAdd,
      });
      total += item.priceAtAdd * item.quantity;
    }

    // Decrement stock
    for (const item of cart.items) {
      await Product.updateOne(
        { _id: item.product._id, "sizes.label": item.size },
        { $inc: { "sizes.$.stock": -item.quantity } }
      );
    }

    const expectedDelivery = new Date();
    expectedDelivery.setDate(expectedDelivery.getDate() + 7);

    const order = await Order.create({
      orderNumber: await generateOrderNumber(),
      user: req.user.id,
      items: orderItems,
      total,
      shippingAddress,
      status: "Placed",
      statusHistory: [{ status: "Placed", at: new Date() }],
      expectedDeliveryDate: expectedDelivery,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/my-orders  -- always scoped to the authenticated user
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

// GET /api/orders/:id  -- ownership enforced by query, not just by id
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filter = mongoose.isValidObjectId(id) ? { _id: id, user: req.user.id } : { orderNumber: id, user: req.user.id };
    const order = await Order.findOne(filter);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/orders/:id/status  (admin/demo use - advances order status)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    order.statusHistory.push({ status, at: new Date() });
    if (status === "Delivered") order.deliveredAt = new Date();
    await order.save();

    res.json({ order });
  } catch (err) {
    next(err);
  }
};

// POST /api/orders/:id/return  { reason }
export const requestReturn = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "Delivered") {
      return res.status(400).json({ message: "Only delivered orders are eligible for return/exchange" });
    }

    order.status = "Return Requested";
    order.statusHistory.push({ status: `Return Requested: ${reason || "no reason given"}`, at: new Date() });
    await order.save();

    res.json({ order });
  } catch (err) {
    next(err);
  }
};
