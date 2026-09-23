import { Router } from "express";
import Message from "../models/Message.js";

const router = Router();

// POST /api/contact - save a message from the contact form
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are all required." });
  }

  try {
    const saved = await Message.create({ name, email, message });
    res.status(201).json({ ok: true, id: saved._id });
  } catch (err) {
    res.status(500).json({ error: "Could not save your message. Try again shortly." });
  }
});

// GET /api/contact - list messages (for your own admin use)
router.get("/", async (_req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Could not load messages" });
  }
});

export default router;
