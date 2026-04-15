import { z } from "zod";

const MAX_FILE_SIZE = 8 * 1024 * 1024;

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

export const createSubCategorySchema = z.object({
  name: translatedNameSchema,
  category: z.string().min(1, "Category is required"),
  subCategoryImage: z
    .any()
    .refine(file => file instanceof File, "Sub Category image is required")
    .refine(
      file => !file || file.size <= MAX_FILE_SIZE,
      "Max image size in 8MB",
    )
    .refine(
      file => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only jpg, jpeg, png, and webp and jfif files are allowed",
    ),
  isActive: z.boolean().optional(),
});

export const updateSubCategorySchema = z
  .object({
    name: translatedNameSchema.partial().optional(),
    category: z.string().min(1, "Category is required").optional(),

    subCategoryImage: z
      .any()
      .optional()
      .refine(file => !file || file instanceof File, "Invalid image file")
      .refine(
        file => !file || file.size <= MAX_FILE_SIZE,
        "Max image size is 8MB",
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
      !!data.subCategoryImage ||
      data.isActive !== undefined,
    { message: "At least one field is required for update" },
  );

export const subCategoryDefaultValues = {
  name: {
    en: "",
    ar: "",
    ku: "",
  },
  category: "",
  subCategoryImage: undefined,
  isActive: true,
};
