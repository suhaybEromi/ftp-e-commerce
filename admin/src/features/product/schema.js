import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/jfif",
  "image/gif",
];

const translatedNameSchema = z.object({
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

const translatedDescriptionSchema = z.object({
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

const colorSchema = z.object({
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

const imageFileSchema = z
  .instanceof(File, {
    message: "Image file is required",
  })
  .refine(file => file.size <= MAX_FILE_SIZE, {
    message: "Each image must be less than 5MB",
  })
  .refine(file => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message:
      "Only .jpg, .jpeg, .png, .webp, .jfif and .gif formats are supported",
  });

const preprocessOptionalNumber = schema =>
  z.preprocess(val => {
    if (val === "" || val === null || val === undefined) return undefined;
    if (typeof val === "number" && Number.isNaN(val)) return undefined;
    return val;
  }, schema);

const preprocessNumberWithDefault = (defaultValue, schema) =>
  z.preprocess(val => {
    if (val === "" || val === null || val === undefined) return defaultValue;
    if (typeof val === "number" && Number.isNaN(val)) return defaultValue;
    return val;
  }, schema);

const requiredNumberFromInput = message =>
  z.preprocess(
    val => {
      if (val === "" || val === null || val === undefined) return undefined;
      if (typeof val === "number" && Number.isNaN(val)) return undefined;
      if (typeof val === "string" && val.trim() === "") return undefined;

      const parsed = Number(val);
      if (Number.isNaN(parsed)) return undefined;

      return parsed;
    },
    z.number({
      required_error: message,
      invalid_type_error: message,
    }),
  );

const variantSchema = z
  .object({
    _id: z.string().optional(),

    color: colorSchema,

    stockStatus: z
      .string()
      .min(1, "Stock status is required")
      .refine(val => ["in_stock", "out_of_stock"].includes(val), {
        message: "Stock status is invalid",
      }),

    stockQuantity: preprocessOptionalNumber(
      z.coerce
        .number()
        .int("Stock quantity must be an integer")
        .min(0, "Stock quantity cannot be negative")
        .optional(),
    ),

    images: z
      .array(imageFileSchema)
      .max(10, "You can upload up to 10 images")
      .optional(),

    existingImages: z.array(z.any()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.stockStatus === "in_stock") {
      if (data.stockQuantity === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["stockQuantity"],
          message: "Stock quantity is required when stock is in stock",
        });
      } else if (data.stockQuantity <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["stockQuantity"],
          message:
            "Stock quantity must be greater than 0 when stock is in stock",
        });
      }
    }

    if (
      data.stockStatus === "out_of_stock" &&
      Number(data.stockQuantity || 0) > 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["stockQuantity"],
        message: "Stock quantity must be 0 when product is out of stock",
      });
    }
  });

const baseProductSchema = z.object({
  name: translatedNameSchema,
  description: translatedDescriptionSchema,

  itemCode: z
    .string()
    .trim()
    .min(1, "Item Code is required")
    .transform(val => val.toUpperCase()),

  collectionName: z.string().trim().min(1, "Collection is required"),
  brand: z.string().trim().min(1, "Brand is required"),

  size: z.enum(["small", "medium", "large"], {
    message: "Size is required",
  }),

  price: requiredNumberFromInput("Price is required").pipe(
    z.number().positive("Price is required"),
  ),

  discountPrice: preprocessNumberWithDefault(
    0,
    z.coerce.number().min(0, "Discount price cannot be negative"),
  ),

  keyword: z
    .array(z.string().trim().min(1, "Keyword cannot be empty"))
    .min(1, "At least one keyword is required")
    .transform(arr => arr.map(item => item.toLowerCase())),

  isFeatured: z.boolean().default(false),

  rating: preprocessNumberWithDefault(
    0,
    z.coerce
      .number()
      .min(0, "Rating must be at least 0")
      .max(5, "Rating cannot exceed 5"),
  ),

  points: preprocessNumberWithDefault(
    0,
    z.coerce.number().min(0, "Points cannot be negative"),
  ),

  cashback: preprocessNumberWithDefault(
    0,
    z.coerce.number().min(0, "Cashback cannot be negative"),
  ),

  isActive: z.boolean().default(true),

  variants: z.array(variantSchema).min(1, "At least one variant is required"),
});

export const createProductSchema = baseProductSchema.superRefine(
  (data, ctx) => {
    if (data.discountPrice >= data.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["discountPrice"],
        message: "Discount price must be less than the original price",
      });
    }

    data.variants.forEach((variant, index) => {
      const newImagesCount = Array.isArray(variant.images)
        ? variant.images.length
        : 0;

      if (newImagesCount < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["variants", index, "images"],
          message: "At least one image is required",
        });
      }

      if (newImagesCount > 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["variants", index, "images"],
          message: "You can upload up to 10 images",
        });
      }
    });
  },
);

export const updateProductSchema = baseProductSchema.superRefine(
  (data, ctx) => {
    if (data.discountPrice >= data.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["discountPrice"],
        message: "Discount price must be less than the original price",
      });
    }

    data.variants.forEach((variant, index) => {
      const newImagesCount = Array.isArray(variant.images)
        ? variant.images.length
        : 0;
      const oldImagesCount = Array.isArray(variant.existingImages)
        ? variant.existingImages.length
        : 0;

      if (newImagesCount === 0 && oldImagesCount === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["variants", index, "images"],
          message: "At least one image is required",
        });
      }

      if (newImagesCount > 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["variants", index, "images"],
          message: "You can upload up to 10 images",
        });
      }
    });
  },
);

export const productDefaultValues = initialValues => ({
  name: {
    en: initialValues?.name?.en || "",
    ar: initialValues?.name?.ar || "",
    ku: initialValues?.name?.ku || "",
  },
  description: {
    en: initialValues?.description?.en || "",
    ar: initialValues?.description?.ar || "",
    ku: initialValues?.description?.ku || "",
  },
  itemCode: initialValues?.itemCode || "",
  collectionName: initialValues?.collectionName || "",
  brand: initialValues?.brand || "",
  size: initialValues?.size || "",
  price: initialValues?.price ?? "",
  discountPrice: initialValues?.discountPrice ?? 0,
  keyword: initialValues?.keyword || [],
  isFeatured: initialValues?.isFeatured ?? false,
  rating: initialValues?.rating ?? 0,
  points: initialValues?.points ?? 0,
  cashback: initialValues?.cashback ?? 0,
  isActive: initialValues?.isActive ?? true,
  variants:
    initialValues?.variants?.length > 0
      ? initialValues.variants.map(variant => ({
          _id: variant._id || "",
          color: {
            en: variant?.color?.en || "",
            ar: variant?.color?.ar || "",
            ku: variant?.color?.ku || "",
          },
          stockStatus: variant?.stockStatus || "in_stock",
          stockQuantity:
            variant?.stockStatus === "out_of_stock"
              ? 0
              : (variant?.stockQuantity ?? ""),
          images: [],
          existingImages: variant?.existingImages || variant?.images || [],
        }))
      : [
          {
            color: { en: "", ar: "", ku: "" },
            stockStatus: "in_stock",
            stockQuantity: "",
            images: [],
            existingImages: [],
          },
        ],
});
