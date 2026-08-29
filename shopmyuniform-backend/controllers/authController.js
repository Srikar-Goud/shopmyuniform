import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Cart from "../models/Cart.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const user = await User.create({ name, email, password, role });
    await Cart.create({ user: user._id, items: [] });

    const token = signToken(user._id);
    res.status(201).json({ token, user: user.toSafeObject() });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user._id);
    res.json({ token, user: user.toSafeObject() });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("school", "name address classes");
    res.json({ user: user.toSafeObject() });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, role, school, studentDetails, phone, address } = req.body;
    const user = await User.findById(req.user.id);

    if (name !== undefined) user.name = name;
    if (role !== undefined) user.role = role;
    if (school !== undefined) user.school = school;
    if (studentDetails !== undefined) user.studentDetails = { ...user.studentDetails, ...studentDetails };
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = { ...user.address, ...address };

    await user.save();
    const populated = await user.populate("school", "name address classes");
    res.json({ user: populated.toSafeObject() });
  } catch (err) {
    next(err);
  }
};
