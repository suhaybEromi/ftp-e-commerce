import { z } from "zod";
import { zObjectId, zTranslatedName } from "./common.validation.js";

export const createCollectionSchema = z.object({
  body: z.object({
    name: zTranslatedName,
    subCategory: zObjectId("subCategory"),
    isActive: z.boolean().optional(),
  }),
  params: z.object({}),
  query: z.object({}),
});

export const updateCollectionSchema = z.object({
  body: z
    .object({
      name: zTranslatedName.partial().optional(),
      subCategory: zObjectId("subCategory").optional(),
      isActive: z.boolean().optional(),
    })
    .refine(data => Object.keys(data).length > 0, {
      message: "At least one field is required for update",
    }),
  params: z.object({
    id: zObjectId("collection id"),
  }),
  query: z.object({}),
});

export const deleteCollectionSchema = z.object({
  body: z.object({}),
  params: z.object({
    id: zObjectId("collection id"),
  }),
  query: z.object({}),
});
