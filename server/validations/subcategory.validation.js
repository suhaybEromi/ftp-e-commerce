import { z } from "zod";
import {
  zBooleanFromFormData,
  zObjectId,
  zTranslatedName,
} from "./common.validation.js";

export const createSubCategorySchema = z.object({
  body: z
    .object({
      name: zTranslatedName,
      category: zObjectId("category"),
      isActive: zBooleanFromFormData,
    })
    .strict(),
  params: z.object({}),
  query: z.object({}),
});

export const updateSubCategorySchema = z.object({
  body: z
    .object({
      name: zTranslatedName.partial().optional(),
      category: zObjectId("category").optional(),
      isActive: zBooleanFromFormData,
    })
    .strict()
    .refine(
      data =>
        data.isActive !== undefined ||
        data.category !== undefined ||
        (data.name && Object.keys(data.name).length > 0),
      { message: "At least one field is required for update" },
    ),
  params: z.object({
    id: zObjectId("subCategory id"),
  }),
  query: z.object({}),
});

export const deleteSubCategorySchema = z.object({
  body: z.object({}),
  params: z.object({
    id: zObjectId("subCategory id"),
  }),
  query: z.object({}),
});
