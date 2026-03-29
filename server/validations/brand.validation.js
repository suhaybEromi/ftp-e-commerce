import { z } from "zod";
import {
  zBooleanFromFormData,
  zObjectId,
  zTranslatedName,
} from "./common.validation.js";

export const createBrandSchema = z.object({
  body: z.object({
    name: zTranslatedName,
    isActive: zBooleanFromFormData,
  }),
  params: z.object({}),
  query: z.object({}),
});

export const updateBrandSchema = z.object({
  body: z
    .object({
      name: zTranslatedName.partial().optional(),
      isActive: zBooleanFromFormData,
    })
    .refine(data => Object.keys(data).length > 0, {
      message: "At least one field is required for update",
    }),
  params: z.object({
    id: zObjectId("brand id"),
  }),
  query: z.object({}),
});

export const deleteBrandSchema = z.object({
  body: z.object({}),
  params: z.object({
    id: zObjectId("brand id"),
  }),
  query: z.object({}),
});
