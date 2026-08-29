import express from "express";
import { listProducts, getProduct, createProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);

export default router;
