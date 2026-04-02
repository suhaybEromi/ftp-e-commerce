import express from "express";

import brandController from "../controllers/brand.controller.js";

import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import {
  createBrandSchema,
  updateBrandSchema,
  deleteBrandSchema,
} from "../validations/brand.validation.js";
import { uploadFile } from "../middlewares/uploadFile.js";

const router = express.Router();

router.get("/", asyncHandler(brandController.getBrand));

router.post(
  "/",
  uploadFile.single("brandImage"),
  validate(createBrandSchema),
  asyncHandler(brandController.addBrand),
);
router.put(
  "/:id",
  uploadFile.single("brandImage"),
  validate(updateBrandSchema),
  asyncHandler(brandController.updateBrand),
);
router.delete(
  "/:id",
  validate(deleteBrandSchema),
  asyncHandler(brandController.deleteBrand),
);

export default router;
