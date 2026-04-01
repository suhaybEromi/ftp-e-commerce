import { z } from "zod";
import {
  zBooleanFromFormData,
  zObjectId,
  zTranslatedName,
} from "./common.validation.js";

// NOTE .strict() .If there are any unknown keys in the input, Zod will throw an error()
// NOTE ئەگەر هەر کلیلێکی نەناسراو لە ئینپوتەکەدا هەبێت، زۆد هەڵەیەک فڕێدەدات

export const createCategorySchema = z.object({
  body: z
    .object({
      name: zTranslatedName,
      isActive: zBooleanFromFormData,
    })
    .strict(),
  params: z.object({}),
  query: z.object({}),
});

export const updateCategorySchema = z.object({
  body: z
    .object({
      name: zTranslatedName.partial().optional(),
      isActive: zBooleanFromFormData,
    })
    .strict()
    .refine(
      data =>
        data.isActive !== undefined ||
        (data.name && Object.keys(data.name).length > 0),
      { message: "At least one field is required for update" },
    ),
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
