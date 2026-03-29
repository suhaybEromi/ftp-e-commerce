import express from "express";

import subCategoryController from "../controllers/subCategory.controller.js";

import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import {
  createSubCategorySchema,
  updateSubCategorySchema,
  deleteSubCategorySchema,
} from "../validations/subcategory.validation.js";

import { uploadFile } from "../middlewares/uploadFile.js";

const router = express.Router();

// Public Routes.
router.get("/", asyncHandler(subCategoryController.getSubCategory));

// Admin Routes
router.post(
  "/",
  uploadFile.single("subCategoryImage"),
  validate(createSubCategorySchema),
  asyncHandler(subCategoryController.addSubCategory),
);
router.put(
  "/:id",
  uploadFile.single("subCategoryImage"),
  validate(updateSubCategorySchema),
  asyncHandler(subCategoryController.updateSubCategory),
);
router.delete(
  "/:id",
  validate(deleteSubCategorySchema),
  asyncHandler(subCategoryController.deleteSubCategory),
);

export default router;
