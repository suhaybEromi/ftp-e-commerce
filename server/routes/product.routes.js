import express from "express";

const router = express.Router();

import productController from "../controllers/product.controller.js";

import { uploadFile } from "../middlewares/uploadFile.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import {
  createProductSchema,
  deleteProductSchema,
  deleteSingleVariantImageSchema,
  updateProductSchema,
  updateSingleVariantImageSchema,
} from "../validations/product.validation.js";

import parseProductFormData from "../middlewares/parseProductFormData.js";

// Fetch Product
router.get("/", asyncHandler(productController.getProduct));

// Create Product
router.post(
  "/",
  uploadFile.any(),
  parseProductFormData,
  validate(createProductSchema),
  asyncHandler(productController.addProduct),
);

// Update product text or text + optional new images
router.put(
  "/:id",
  uploadFile.any(),
  parseProductFormData,
  validate(updateProductSchema),
  asyncHandler(productController.updateProduct),
);

// Replace one image only inside one variant
router.put(
  "/:productId/variants/:variantId/images/:imageId",
  uploadFile.single("productImage"),
  validate(updateSingleVariantImageSchema),
  asyncHandler(productController.updateSingleVariantImage),
);

// Delete one image only inside one variant
router.delete(
  "/:productId/variants/:variantId/images/:imageId",
  validate(deleteSingleVariantImageSchema),
  asyncHandler(productController.deleteSingleVariantImage),
);

// Delete whole product
router.delete(
  "/:id",
  validate(deleteProductSchema),
  asyncHandler(productController.deleteProduct),
);

export default router;
