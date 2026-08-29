import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verifies the JWT and attaches the authenticated user to req.user.
// CRITICAL: every downstream handler (including the AI agent's tools) must
// take the user id from req.user.id, never from the request body/query,
// so a user can never fetch another user's data.
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user no longer exists" });
    }

    req.user = { id: user._id.toString(), email: user.email, role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, invalid or expired token" });
  }
};
