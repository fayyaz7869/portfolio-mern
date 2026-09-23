import { Router } from "express";
import Project from "../models/Project.js";

const router = Router();

// GET /api/projects - list all, featured first
router.get("/", async (_req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, order: 1, createdAt: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Could not load projects" });
  }
});

// POST /api/projects - add a new project (simple admin use, no auth wired up)
router.post("/", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: "Could not create project", details: err.message });
  }
});

export default router;
