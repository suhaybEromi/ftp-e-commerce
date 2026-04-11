import { z } from "zod";
import {
  zBooleanFromFormData,
  zObjectId,
  zTranslatedDescription,
  zTranslatedDescriptionPartial,
  zTranslatedName,
  zTranslatedNamePartial,
  optionalNumberFromFormData,
  numberFromFormData,
} from "./common.validation.js";

const zColor = z.object({
  en: z
    .string()
    .trim()
    .min(1, "English color is required")
    .max(50, "English color must not exceed 50 characters"),

  ar: z
    .string()
    .trim()
    .max(50, "Arabic color must not exceed 50 characters")
    .optional()
    .or(z.literal("")),

  ku: z
    .string()
    .trim()
    .max(50, "Kurdish color must not exceed 50 characters")
    .optional()
    .or(z.literal("")),
});

const zSize = z.enum(["small", "medium", "large"]);

const zVariant = z
  .object({
    _id: z.string().optional(),

    color: zColor,

    stockStatus: z.enum(["in_stock", "out_of_stock"], {
      message: "Stock status is invalid",
    }),

    stockQuantity: optionalNumberFromFormData.pipe(
      z
        .number()
        .int("Stock quantity must be an integer")
        .min(0, "Stock quantity cannot be negative")
        .optional(),
    ),
  })
  .superRefine((data, ctx) => {
    if (data.stockStatus === "in_stock") {
      if (data.stockQuantity === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["stockQuantity"],
          message: "Stock quantity is required when stock status is in stock",
        });
      } else if (data.stockQuantity <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["stockQuantity"],
          message:
            "Stock quantity must be greater than 0 when stock status is in stock",
        });
      }
    }

    if (
      data.stockStatus === "out_of_stock" &&
      data.stockQuantity !== undefined &&
      data.stockQuantity > 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["stockQuantity"],
        message: "Stock quantity must be 0 when stock status is out of stock",
      });
    }
  });

export const createProductSchema = z.object({
  body: z
    .object({
      name: zTranslatedName,
      description: zTranslatedDescription,

      variants: z.array(zVariant).min(1, "At least one variant is required"),

      itemCode: z
        .string()
        .trim()
        .min(1, "ItemCode is required")
        .transform(val => val.toUpperCase()),

      collectionName: zObjectId("collectionName"),
      brand: zObjectId("brand"),

      size: zSize,

      price: numberFromFormData.pipe(z.number().positive("Price is required")),

      discountPrice: z.preprocess(
        val => {
          if (val === "" || val === null || val === undefined) return 0;
          if (typeof val === "number" && Number.isNaN(val)) return 0;
          return val;
        },
        z.coerce.number().min(0, "Discount Price cannot be negative"),
      ),

      keyword: z
        .array(z.string().trim().min(1, "Keyword cannot be empty"))
        .min(1, "At least one keyword is required")
        .transform(arr => arr.map(item => item.toLowerCase())),

      isFeatured: zBooleanFromFormData.optional().default(false),

      rating: z.preprocess(
        val => (val === "" || val === null || val === undefined ? 0 : val),
        z.coerce
          .number()
          .min(0, "Rating must be at least 0")
          .max(5, "Rating cannot exceed 5"),
      ),

      points: z.preprocess(
        val => (val === "" || val === null || val === undefined ? 0 : val),
        z.coerce.number().min(0, "Points cannot be negative"),
      ),

      cashback: z.preprocess(
        val => (val === "" || val === null || val === undefined ? 0 : val),
        z.coerce.number().min(0, "Cashback cannot be negative"),
      ),

      isActive: zBooleanFromFormData.optional().default(true),
    })
    .strict()
    .superRefine((data, ctx) => {
      if (data.discountPrice >= data.price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["discountPrice"],
          message: "Discount price must be less than the original price",
        });
      }
    }),

  params: z.object({}),
  query: z.object({}),
});

export const updateProductSchema = z.object({
  body: z
    .object({
      name: zTranslatedNamePartial.optional(),
      description: zTranslatedDescriptionPartial.optional(),

      variants: z
        .array(zVariant)
        .min(1, "At least one variant is required")
        .optional(),

      itemCode: z
        .string()
        .trim()
        .min(1, "ItemCode is required")
        .transform(val => val.toUpperCase())
        .optional(),

      collectionName: zObjectId("collectionName").optional(),
      brand: zObjectId("brand").optional(),

      size: zSize.optional(),

      price: optionalNumberFromFormData.pipe(
        z.number().positive("Price must be greater than 0").optional(),
      ),

      discountPrice: optionalNumberFromFormData.pipe(
        z.number().min(0, "Discount price cannot be negative").optional(),
      ),

      keyword: z
        .array(z.string().trim().min(1, "Keyword cannot be empty"))
        .min(1, "At least one keyword is required")
        .transform(arr => arr.map(item => item.toLowerCase()))
        .optional(),

      isFeatured: zBooleanFromFormData.optional(),
      rating: optionalNumberFromFormData.pipe(
        z
          .number()
          .min(0, "Rating must be at least 0")
          .max(5, "Rating cannot exceed 5")
          .optional(),
      ),

      points: optionalNumberFromFormData.pipe(
        z.number().min(0, "Points cannot be negative").optional(),
      ),

      cashback: optionalNumberFromFormData.pipe(
        z.number().min(0, "Cashback cannot be negative").optional(),
      ),

      isActive: zBooleanFromFormData.optional(),
    })
    .strict()
    .superRefine((data, ctx) => {
      if (
        data.price !== undefined &&
        data.discountPrice !== undefined &&
        data.discountPrice >= data.price
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["discountPrice"],
          message: "Discount price must be less than the original price",
        });
      }
    }),

  params: z.object({
    id: zObjectId("product id"),
  }),

  query: z.object({}),
});

export const deleteProductSchema = z.object({
  body: z.object({}),
  params: z.object({
    id: zObjectId("product id"),
  }),
  query: z.object({}),
});

export const updateSingleVariantImageSchema = z.object({
  body: z.object({}),
  params: z.object({
    productId: zObjectId("product id"),
    variantId: zObjectId("variant id"),
    imageId: zObjectId("image id"),
  }),
  query: z.object({}),
});

export const deleteSingleVariantImageSchema = z.object({
  body: z.object({}),
  params: z.object({
    productId: zObjectId("product id"),
    variantId: zObjectId("variant id"),
    imageId: zObjectId("image id"),
  }),
  query: z.object({}),
});
