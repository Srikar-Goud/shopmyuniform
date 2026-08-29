import express from "express";
import { listSchools, getSchool, createSchool } from "../controllers/schoolController.js";

const router = express.Router();

router.get("/", listSchools);
router.get("/:id", getSchool);
router.post("/", createSchool);

export default router;
