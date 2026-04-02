import SubCategory from "../models/subCategory.js";
import { deleteFile } from "../utils/deleteFile.js";

// Functionality Fetch getSubCategory
const getSubCategory = async (req, res, next) => {
  const { search = "" } = req.query;

  const searchQuery = search
    ? {
        $or: [
          { "name.en": { $regex: search, $options: "i" } },
          { "name.ar": { $regex: search, $options: "i" } },
          { "name.ku": { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const subCategory = await SubCategory.find(searchQuery)
    .populate("category")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "SubCategory fetched successfully",
    subCategory,
  });
};

// Functionality Add SubCategory
const addSubCategory = async (req, res, next) => {
  const { name, category, isActive } = req.validated.body;

  // Validate file
  if (!req.file) {
    const err = new Error("SubCategory image is required");
    err.statusCode = 400;
    throw err;
  }

  // Name file path
  const fileName = req.file.filename;
  const imagePath = `/uploads/subCategory/${fileName}`;
  const imageKey = `subCategory/${fileName}`;

  // Validate isActive, if type undefined chnage to true or isActive
  const parsedIsActive = typeof isActive === "undefined" ? true : isActive;

  // Create SubCategory
  const subCategory = await SubCategory.create({
    name,
    category,
    images: [{ url: imagePath, key: imageKey }],
    isActive: parsedIsActive,
  });

  return res.status(201).json({
    success: true,
    message: "SubCategory added successfully",
    subCategory,
  });
};

// Functionality Update SubCategory
const updateSubCategory = async (req, res, next) => {
  const { id } = req.validated.params;

  const { name, category, isActive } = req.validated.body;

  // Find sub category by id
  const subCategory = await SubCategory.findById(id);

  // There is a sub category or there is not
  if (!subCategory) {
    const err = new Error("SubCategory not found");
    err.statusCode = 404;
    throw err;
  }

  // Validate name undefined or not
  if (name !== undefined) {
    subCategory.name = {
      en: name.en ?? subCategory.name.en,
      ar: name.ar ?? subCategory.name.ar,
      ku: name.ku ?? subCategory.name.ku,
    };
  }

  // Validate category undefined or not
  if (category !== undefined) {
    subCategory.category = category;
  }

  // Validate isActice undefined or not
  if (typeof isActive !== "undefined") {
    subCategory.isActive = isActive;
  }

  // Check file.
  if (req.file) {
    // Old image
    const oldImage = subCategory.images?.[0]?.url;

    // Name file path and new image
    const fileName = req.file.filename;
    const newImagePath = `/uploads/subCategory/${fileName}`;
    const newImageKey = `subCategory/${fileName}`;

    // Send image
    subCategory.images = [{ url: newImagePath, key: newImageKey }];

    // Delete old image if insert new image
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

// Functionality Delete SubCategory
const deleteSubCategory = async (req, res, next) => {
  const { id } = req.validated.params;

  // Find sub category by id
  const subCategory = await SubCategory.findById(id);

  // There is a sub category or there is not sub category
  if (!subCategory) {
    const err = new Error("SubCategory not found");
    err.statusCode = 404;
    throw err;
  }

  // Old image
  const oldImage = subCategory.images?.[0]?.url;

  // Delete old image
  if (oldImage) {
    deleteFile(oldImage);
  }

  await SubCategory.deleteOne({ _id: id });

  return res.status(200).json({
    success: true,
    message: "SubCategory delete successfully",
  });
};

export default {
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
