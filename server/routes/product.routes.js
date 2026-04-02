import express from "express";
const router = express.Router();

import productController from "../controllers/product.controller.js";

import { uploadFile } from "../middlewares/uploadFile.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";

// Fetch Product
router.get("/", asyncHandler(productController.getProduct));

// Add Product
router.post(
  "/",
  uploadFile.single("productImage"),
  validate(),
  asyncHandler(productController.addProduct),
);

// Edit Product
router.put(
  "/:id",
  uploadFile.single("productImage"),
  validate(),
  asyncHandler(productController.updateProduct),
);

// Delete Product
router.delete(
  "/:id",
  validate(),
  asyncHandler(productController.deleteProduct),
);

export default router;
