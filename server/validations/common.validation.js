import mongoose from "mongoose";
import { z } from "zod";

export const zObjectId = (field = "id") =>
  z
    .string()
    .trim()
    .refine(val => mongoose.isValidObjectId(val), {
      message: `${field} is not a valid ObjectId`,
    });

export const zBooleanFromFormData = z.preprocess(val => {
  if (val === "true") return true;
  if (val === "false") return false;
  return val;
}, z.boolean());

export const optionalNumberFromFormData = z.preprocess(val => {
  if (val === "" || val === null || val === undefined) return undefined;
  if (typeof val === "number" && Number.isNaN(val)) return undefined;
  return val;
}, z.coerce.number().optional());

export const numberFromFormData = z.preprocess(val => {
  if (val === "" || val === null || val === undefined) return undefined;
  if (typeof val === "number" && Number.isNaN(val)) return undefined;
  return val;
}, z.coerce.number());

export const zTranslatedName = z.object({
  en: z
    .string()
    .trim()
    .min(2, "English name must be at least 2 characters")
    .max(80, "English name must not exceed 80 characters"),

  ar: z
    .string()
    .trim()
    .min(2, "Arabic name must be at least 2 characters")
    .max(80, "Arabic name must not exceed 80 characters"),

  ku: z
    .string()
    .trim()
    .min(2, "Kurdish name must be at least 2 characters")
    .max(80, "Kurdish name must not exceed 80 characters"),
});

export const zTranslatedNamePartial = z
  .object({
    en: z
      .string()
      .trim()
      .min(2, "English name must be at least 2 characters")
      .max(80, "English name must not exceed 80 characters")
      .optional(),

    ar: z
      .string()
      .trim()
      .min(2, "Arabic name must be at least 2 characters")
      .max(80, "Arabic name must not exceed 80 characters")
      .optional(),

    ku: z
      .string()
      .trim()
      .min(2, "Kurdish name must be at least 2 characters")
      .max(80, "Kurdish name must not exceed 80 characters")
      .optional(),
  })
  .refine(data => Object.keys(data).length > 0, {
    message: "At least one translated name field is required",
  });

export const zTranslatedDescription = z.object({
  en: z
    .string()
    .trim()
    .min(10, "English description must be at least 10 characters")
    .max(500, "English description must not exceed 500 characters"),

  ar: z
    .string()
    .trim()
    .min(10, "Arabic description must be at least 10 characters")
    .max(500, "Arabic description must not exceed 500 characters"),

  ku: z
    .string()
    .trim()
    .min(10, "Kurdish description must be at least 10 characters")
    .max(500, "Kurdish description must not exceed 500 characters"),
});

export const zTranslatedDescriptionPartial = z
  .object({
    en: z
      .string()
      .trim()
      .min(10, "English description must be at least 10 characters")
      .max(500, "English description must not exceed 500 characters")
      .optional(),

    ar: z
      .string()
      .trim()
      .min(10, "Arabic description must be at least 10 characters")
      .max(500, "Arabic description must not exceed 500 characters")
      .optional(),

    ku: z
      .string()
      .trim()
      .min(10, "Kurdish description must be at least 10 characters")
      .max(500, "Kurdish description must not exceed 500 characters")
      .optional(),
  })
  .refine(data => Object.keys(data).length > 0, {
    message: "At least one translated description field is required",
  });
