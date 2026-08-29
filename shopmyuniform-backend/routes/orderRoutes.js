import express from "express";
import {
  checkout,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  requestReturn,
} from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.post("/checkout", checkout);
router.get("/my-orders", getMyOrders);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);
router.post("/:id/return", requestReturn);

export default router;
