import Conversation from "../models/Conversation.js";
import { runAgent } from "../services/aiAgent.js";

const MAX_HISTORY_MESSAGES = 20; // keep the last N messages as context for the model

// GET /api/chat/history
export const getHistory = async (req, res, next) => {
  try {
    const convo = await Conversation.findOne({ user: req.user.id });
    res.json({ messages: convo ? convo.messages : [] });
  } catch (err) {
    next(err);
  }
};

// POST /api/chat  { message }
export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ message: "Message text is required" });
    }

    let convo = await Conversation.findOne({ user: req.user.id });
    if (!convo) convo = await Conversation.create({ user: req.user.id, messages: [] });

    const history = convo.messages.slice(-MAX_HISTORY_MESSAGES).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const reply = await runAgent({ history, message, userId: req.user.id });

    convo.messages.push({ role: "user", content: message });
    convo.messages.push({ role: "assistant", content: reply });
    await convo.save();

    res.json({ reply });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/chat/history - lets a user reset their conversation context
export const clearHistory = async (req, res, next) => {
  try {
    await Conversation.findOneAndUpdate({ user: req.user.id }, { messages: [] }, { upsert: true });
    res.json({ message: "Conversation cleared" });
  } catch (err) {
    next(err);
  }
};
