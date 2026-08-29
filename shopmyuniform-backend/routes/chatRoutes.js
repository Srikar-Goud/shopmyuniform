import express from "express";
import { getHistory, sendMessage, clearHistory } from "../controllers/chatController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.get("/history", getHistory);
router.post("/", sendMessage);
router.delete("/history", clearHistory);

export default router;
