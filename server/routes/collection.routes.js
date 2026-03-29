import express from "express";

import collectionController from "../controllers/collection.controller.js";

import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import {
  createCollectionSchema,
  updateCollectionSchema,
  deleteCollectionSchema,
} from "../validations/collection.validation.js";

import { uploadFile } from "../middlewares/uploadFile.js";

const router = express.Router();

// Public Routes.
router.get("/", asyncHandler(collectionController.getCollection));

// Admin Routes
router.post(
  "/",
  uploadFile.single("collectionImage"),
  validate(createCollectionSchema),
  asyncHandler(collectionController.addCollection),
);
router.put(
  "/:id",
  uploadFile.single("collectionImage"),
  validate(updateCollectionSchema),
  asyncHandler(collectionController.updateCollection),
);
router.delete(
  "/:id",
  validate(deleteCollectionSchema),
  asyncHandler(collectionController.deleteCollection),
);

export default router;
