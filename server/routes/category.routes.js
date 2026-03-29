import express from "express";

import categoryController from "../controllers/category.controller.js";

import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
} from "../validations/category.validation.js";
import { uploadFile } from "../middlewares/uploadFile.js";

const router = express.Router();

// Public Routes.
router.get("/", asyncHandler(categoryController.getCategory));

// Admin Routes
router.post(
  "/",
  uploadFile.single("categoryImage"),
  validate(createCategorySchema),
  asyncHandler(categoryController.addCategory),
);
router.put(
  "/:id",
  uploadFile.single("categoryImage"),
  validate(updateCategorySchema),
  asyncHandler(categoryController.updateCategory),
);
router.delete(
  "/:id",
  validate(deleteCategorySchema),
  asyncHandler(categoryController.deleteCategory),
);

export default router;
