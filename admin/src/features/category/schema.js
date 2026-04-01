import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/jfif",
];

const translatedNameSchema = z.object({
  en: z
    .string()
    .trim()
    .min(2, "English name must be at least 2 characters")
    .max(80),
  ar: z
    .string()
    .trim()
    .min(2, "Arabic name must be at least 2 characters")
    .max(80),
  ku: z
    .string()
    .trim()
    .min(2, "Kurdish name must be at least 2 characters")
    .max(80),
});

export const createCategorySchema = z.object({
  name: translatedNameSchema,
  categoryImage: z
    .any()
    .refine(file => file instanceof File, "Category image is required")
    .refine(
      file => !file || file.size <= MAX_FILE_SIZE,
      "Max image size in 2MB",
    )
    .refine(
      file => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only jpg, jpeg, png, and webp and jfif files are allowed",
    ),
  isActive: z.boolean().optional(),
});

export const updateCategorySchema = z
  .object({
    name: translatedNameSchema.partial().optional(),

    categoryImage: z
      .any()
      .optional()
      .refine(file => !file || file instanceof File, "Invalid image file")
      .refine(
        file => !file || file.size <= MAX_FILE_SIZE,
        "Max image size is 2MB",
      )
      .refine(
        file => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only jpg, jpeg, png, and webp and jfif files are allowed",
      ),
    isActive: z.boolean().optional(),
  })
  .refine(
    data =>
      (data.name && Object.keys(data.name).length > 0) ||
      !!data.categoryImage ||
      data.isActive !== undefined,
    { message: "At least one field is required for update" },
  );

export const categoryDefaultValues = {
  name: {
    en: "",
    ar: "",
    ku: "",
  },
  categoryImage: undefined,
  isActive: true,
};
