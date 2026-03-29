import SubCategory from "../models/subCategory.js";
import { deleteFile } from "../utils/deleteFile.js";

const getSubCategory = async (req, res, next) => {
  const subCategory = await SubCategory.find().sort({ createdAt: -1 });
  // .populate("category", "name")
  return res.status(200).json({
    success: true,
    message: "SubCategory fetched successfully",
    subCategory,
  });
};

const addSubCategory = async (req, res, next) => {
  const { name, category, isActive } = req.validated.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "SubCategory image is required",
    });
  }

  const fileName = req.file.filename;
  const imagePath = `/uploads/subCategory/${fileName}`;
  const imageKey = `subCategory/${fileName}`;

  const subCategory = await SubCategory.create({
    name,
    category,
    images: [{ url: imagePath, key: imageKey }],
    isActive,
  });

  return res.status(201).json({
    success: true,
    message: "SubCategory added successfully",
    subCategory,
  });
};

const updateSubCategory = async (req, res, next) => {
  const { id } = req.validated.params;

  const { name, category, image, isActive } = req.validated.body;

  const subCategory = await SubCategory.findById(id);

  if (!subCategory)
    return res
      .status(404)
      .json({ success: false, message: "SubCategory not found" });

  if (name !== undefined) {
    subCategory.name = {
      en: name.en ?? subCategory.name.en,
      ar: name.ar ?? subCategory.name.ar,
      ku: name.ku ?? subCategory.name.ku,
    };
  }

  if (category !== undefined) {
    subCategory.category = category;
  }

  if (typeof isActive !== "undefined") {
    subCategory.isActive = isActive;
  }

  if (req.file) {
    const oldImage = subCategory.images?.[0]?.url;

    const fileName = req.file.filename;
    const newImagePath = `/uploads/subCategory/${fileName}`;
    const newImageKey = `subCategory/${fileName}`;

    subCategory.images = [
      {
        url: newImagePath,
        key: newImageKey,
      },
    ];

    if (oldImage) {
      deleteFile(oldImage);
    }
  }

  await subCategory.save();

  return res.status(200).json({
    success: true,
    message: "Update SubCategory successfully",
    subCategory,
  });
};

const deleteSubCategory = async (req, res, next) => {
  const { id } = req.validated.params;

  const subCategory = await SubCategory.findById(id);

  if (!subCategory) {
    return res.status(404).json({
      success: false,
      message: "SubCategory not found",
    });
  }

  const oldImage = subCategory.images?.[0]?.url;

  if (oldImage) {
    deleteFile(oldImage);
  }

  await SubCategory.deleteOne({ _id: id });

  return res
    .status(200)
    .json({ success: true, message: "SubCategory delete successfully" });
};

export default {
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
