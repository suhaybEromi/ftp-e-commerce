import Category from "../models/category.js";
import { deleteFile } from "../utils/deleteFile.js";

const getCategory = async (req, res, next) => {
  const category = await Category.find().sort({ createdAt: -1 });
  return res.status(200).json({
    success: true,
    message: "Category fetched successfully",
    category,
  });
};

const addCategory = async (req, res, next) => {
  const { name, isActive } = req.validated.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Category image is required",
    });
  }

  const fileName = req.file.filename;
  const imagePath = `/uploads/categories/${fileName}`;
  const imageKey = `categories/${fileName}`;

  const category = await Category.create({
    name,
    images: [{ url: imagePath, key: imageKey }],
    isActive,
  });

  return res
    .status(201)
    .json({ success: true, message: "Category added successfully", category });
};

const updateCategory = async (req, res, next) => {
  const { id } = req.validated.params;

  const { name, isActive } = req.validated.body;

  const category = await Category.findById(id);

  if (!category)
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });

  if (name !== undefined) {
    category.name = {
      en: name.en ?? category.name.en,
      ar: name.ar ?? category.name.ar,
      ku: name.ku ?? category.name.ku,
    };
  }

  if (typeof isActive !== "undefined") {
    brand.isActive = isActive;
  }

  if (req.file) {
    const oldImage = category.images?.[0]?.url;

    const fileName = req.file.filename;
    const newImagePath = `/uploads/categories/${fileName}`;
    const newImageKey = `categories/${fileName}`;

    category.images = [
      {
        url: newImagePath,
        key: newImageKey,
      },
    ];

    if (oldImage) {
      deleteFile(oldImage);
    }
  }

  await category.save();

  return res.status(200).json({
    success: true,
    message: "Update category successfully",
    category,
  });
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.validated.params;

  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  const oldImage = category.images?.[0]?.url;

  if (oldImage) {
    deleteFile(oldImage);
  }

  await Category.deleteOne({ _id: id });

  return res
    .status(200)
    .json({ success: true, message: "Category delete successfully" });
};

export default { getCategory, addCategory, updateCategory, deleteCategory };
