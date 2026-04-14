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
  updateProductStatusSchema,
  updateSingleVariantImageSchema,
} from "../validations/product.validation.js";

import parseProductFormData from "../middlewares/parseProductFormData.js";
import authMiddleware from "../middlewares/auth.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import canAccessProduct from "../middlewares/canAccessProduct.js";

// Fetch Product
router.get(
  "/",
  authMiddleware,
  authorizeRoles("super_admin", "admin", "data_entry"),
  asyncHandler(productController.getProduct),
);

// Create Product
router.post(
  "/",
  authMiddleware,
  authorizeRoles("super_admin", "admin", "data_entry"),
  uploadFile.any(),
  parseProductFormData,
  validate(createProductSchema),
  asyncHandler(productController.addProduct),
);

// Update product text or text + optional new images
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("super_admin", "admin", "data_entry"),
  asyncHandler(canAccessProduct),
  uploadFile.any(),
  parseProductFormData,
  validate(updateProductSchema),
  asyncHandler(productController.updateProduct),
);

// Update status product.
router.put(
  "/update-status/:id",
  authMiddleware,
  authorizeRoles("super_admin", "admin"),
  validate(updateProductStatusSchema),
  asyncHandler(productController.updateStatus),
);

// Replace one image only inside one variant
router.put(
  "/:productId/variants/:variantId/images/:imageId",
  authMiddleware,
  authorizeRoles("super_admin", "admin", "data_entry"),
  uploadFile.single("productImage"),
  validate(updateSingleVariantImageSchema),
  asyncHandler(productController.updateSingleVariantImage),
);

// Delete one image only inside one variant
router.delete(
  "/:productId/variants/:variantId/images/:imageId",
  authMiddleware,
  authorizeRoles("super_admin", "admin", "data_entry"),
  validate(deleteSingleVariantImageSchema),
  asyncHandler(productController.deleteSingleVariantImage),
);

// Delete whole product
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("super_admin", "admin", "data_entry"),
  validate(deleteProductSchema),
  asyncHandler(productController.deleteProduct),
);

export default router;
