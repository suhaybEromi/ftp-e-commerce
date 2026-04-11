import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/";

    if (
      file.fieldname === "productImage" ||
      /^variant_\d+_images$/.test(file.fieldname)
    ) {
      folder = "uploads/products/";
    } else if (file.fieldname === "avatar") {
      folder = "uploads/users/";
    } else if (file.fieldname === "brandImage") {
      folder = "uploads/brands/";
    } else if (file.fieldname === "categoryImage") {
      folder = "uploads/categories/";
    } else if (file.fieldname === "subCategoryImage") {
      folder = "uploads/subCategories/";
    } else if (file.fieldname === "collectionImage") {
      folder = "uploads/collections/";
    }

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const fileName =
      file.fieldname +
      "-" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      ext;

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
    "image/jfif",
    "image/gif",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only images are allowed(PNG, JPG, JPEG, WEBP, JFIF, GIF)"),
      false,
    );
  }
};

export const uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
