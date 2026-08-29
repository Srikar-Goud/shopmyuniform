import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    const populated = await cart.populate("items.product", "name images price sizes school");
    res.json({ cart: populated });
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, size, quantity = 1 } = req.body;
    if (!productId || !size) {
      return res.status(400).json({ message: "productId and size are required" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const sizeEntry = product.sizes.find((s) => s.label === size);
    if (!sizeEntry) return res.status(400).json({ message: `Size ${size} is not available for this product` });
    if (sizeEntry.stock < quantity) {
      return res.status(400).json({ message: `Only ${sizeEntry.stock} unit(s) left in size ${size}` });
    }

    const cart = await getOrCreateCart(req.user.id);
    const existing = cart.items.find((i) => i.product.toString() === productId && i.size === size);

    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      cart.items.push({ product: productId, size, quantity, priceAtAdd: product.price });
    }

    await cart.save();
    const populated = await cart.populate("items.product", "name images price sizes school");
    res.json({ cart: populated });
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await getOrCreateCart(req.user.id);
    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    if (quantity <= 0) {
      item.deleteOne();
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    const populated = await cart.populate("items.product", "name images price sizes school");
    res.json({ cart: populated });
  } catch (err) {
    next(err);
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const cart = await getOrCreateCart(req.user.id);
    const item = cart.items.id(itemId);
    if (item) item.deleteOne();
    await cart.save();
    const populated = await cart.populate("items.product", "name images price sizes school");
    res.json({ cart: populated });
  } catch (err) {
    next(err);
  }
};
