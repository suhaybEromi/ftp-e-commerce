import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderMap = {
      productImage: "uploads/products/",
      avatar: "uploads/users/",
      brandImage: "uploads/brands/",
      categoryImage: "uploads/categories/",
      subCategoryImage: "uploads/subCategories/",
      collectionImage: "uploads/collections/",
    };

    const folder = folderMap[file.fieldname] || "uploads/";

    // create folder if not exists
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
