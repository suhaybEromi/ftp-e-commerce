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

export const createCollectionSchema = z.object({
  name: translatedNameSchema,
  subCategory: z.string().min(1, "SubCategory is required"),
  collectionImage: z
    .any()
    .refine(file => file instanceof File, "Collection image is required")
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

export const updateCollectionSchema = z
  .object({
    name: translatedNameSchema.partial().optional(),
    subCategory: z.string().min(1, "SubCategory is required").optional(),

    collectionImage: z
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
      !!data.collectionImage ||
      data.isActive !== undefined,
    { message: "At least one field is required for update" },
  );

export const collectionDefaultValues = {
  name: {
    en: "",
    ar: "",
    ku: "",
  },
  subCategory: "",
  collectionImage: undefined,
  isActive: true,
};
