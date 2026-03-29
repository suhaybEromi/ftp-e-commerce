import { z } from "zod";
import { zObjectId, zTranslatedName } from "./common.validation.js";

export const createCategorySchema = z.object({
  body: z.object({
    name: zTranslatedName,
    isActive: z.boolean().optional(),
  }),
  params: z.object({}),
  query: z.object({}),
});

export const updateCategorySchema = z.object({
  body: z
    .object({
      name: zTranslatedName.partial().optional(),
      isActive: z.boolean().optional(),
    })
    .refine(data => Object.keys(data).length > 0, {
      message: "At least one field is required for update",
    }),
  params: z.object({
    id: zObjectId("category id"),
  }),
  query: z.object({}),
});

export const deleteCategorySchema = z.object({
  body: z.object({}),
  params: z.object({
    id: zObjectId("category id"),
  }),
  query: z.object({}),
});
