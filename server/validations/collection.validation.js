import { z } from "zod";
import {
  zBooleanFromFormData,
  zObjectId,
  zTranslatedName,
} from "./common.validation.js";

export const createCollectionSchema = z.object({
  body: z
    .object({
      name: zTranslatedName,
      subCategory: zObjectId("subCategory"),
      isActive: zBooleanFromFormData,
    })
    .strict(),
  params: z.object({}),
  query: z.object({}),
});

export const updateCollectionSchema = z.object({
  body: z
    .object({
      name: zTranslatedName.partial().optional(),
      subCategory: zObjectId("subCategory").optional(),
      isActive: zBooleanFromFormData,
    })
    .strict()
    .refine(
      data =>
        data.isActive !== undefined ||
        data.subCategory !== undefined ||
        (data.name && Object.keys(data.name).length > 0),
      { message: "At least one field is required for update" },
    ),
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
