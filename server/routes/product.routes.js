import express from "express";

const router = express.Router();

import productController from "../controllers/product.controller.js";

import { uploadFile } from "../middlewares/uploadFile.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import {
  createProductSchema,
  deleteProductSchema,
  updateProductSchema,
} from "../validations/product.validation.js";

import parseProductFormData from "../middlewares/parseProductFormData.js";

// Fetch Product
router.get("/", asyncHandler(productController.getProduct));

// Add Product
router.post(
  "/",
  uploadFile.array("productImage", 2),
  parseProductFormData,
  validate(createProductSchema),
  asyncHandler(productController.addProduct),
);

// Edit Product
router.put(
  "/:id",
  uploadFile.array("productImage", 2),
  parseProductFormData,
  validate(updateProductSchema),
  asyncHandler(productController.updateProduct),
);

// Delete Product
router.delete(
  "/:id",
  validate(deleteProductSchema),
  asyncHandler(productController.deleteProduct),
);

export default router;
