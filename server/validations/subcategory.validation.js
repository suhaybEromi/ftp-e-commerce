import { z } from "zod";
import { zObjectId, zTranslatedName } from "./common.validation.js";

export const createSubCategorySchema = z.object({
  body: z.object({
    name: zTranslatedName,
    category: zObjectId("category"),
    isActive: z.boolean().optional(),
  }),
  params: z.object({}),
  query: z.object({}),
});

export const updateSubCategorySchema = z.object({
  body: z
    .object({
      name: zTranslatedName.partial().optional(),
      category: zObjectId("category").optional(),
      isActive: z.boolean().optional(),
    })
    .refine(data => Object.keys(data).length > 0, {
      message: "At least one field is required for update",
    }),
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
