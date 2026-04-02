import Category from "../models/category.js";
import { deleteFile } from "../utils/deleteFile.js";

// Functionality Fetch Category
const getCategory = async (req, res) => {
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

  const category = await Category.find(searchQuery).sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Category fetched successfully",
    category,
  });
};

// Functionality Add Category
const addCategory = async (req, res) => {
  const { name, isActive } = req.validated.body;

  // Validate file
  if (!req.file) {
    const err = new Error("Category image is required");
    err.statusCode = 400;
    throw err;
  }

  // Name file path
  const fileName = req.file.filename;
  const imagePath = `/uploads/categories/${fileName}`;
  const imageKey = `categories/${fileName}`;

  // Validate isActive, if type undefined chnage to true or isActive
  const parsedIsActive = typeof isActive === "undefined" ? true : isActive;

  // Create category
  const category = await Category.create({
    name,
    images: [{ url: imagePath, key: imageKey }],
    isActive: parsedIsActive,
  });

  return res.status(201).json({
    success: true,
    message: "Category added successfully",
    category,
  });
};

// Functionality Update Category
const updateCategory = async (req, res) => {
  const { id } = req.validated.params;

  const { name, isActive } = req.validated.body;

  // Find category by id
  const category = await Category.findById(id);

  // There is a category or there is not
  if (!category) {
    const err = new Error("Category not found");
    err.statusCode = 404;
    throw err;
  }

  // Validate name undefined or not
  if (name !== undefined) {
    category.name = {
      en: name.en ?? category.name.en,
      ar: name.ar ?? category.name.ar,
      ku: name.ku ?? category.name.ku,
    };
  }

  // Validate isActice undefined or not
  if (typeof isActive !== "undefined") {
    category.isActive = isActive;
  }

  // Check file
  if (req.file) {
    // Old image
    const oldImage = category.images?.[0]?.url;

    // Name file path and new image
    const fileName = req.file.filename;
    const newImagePath = `/uploads/categories/${fileName}`;
    const newImageKey = `categories/${fileName}`;

    // Send image
    category.images = [{ url: newImagePath, key: newImageKey }];

    // Delete old image if insert new image
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

// Functionality Delete Category
const deleteCategory = async (req, res) => {
  const { id } = req.validated.params;

  // Find category by id
  const category = await Category.findById(id);

  // There is a category or there is not category
  if (!category) {
    const err = new Error("Category not found");
    err.statusCode = 404;
    throw err;
  }

  // Old image
  const oldImage = category.images?.[0]?.url;

  // Delete old image
  if (oldImage) {
    deleteFile(oldImage);
  }

  await Category.deleteOne({ _id: id });

  return res.status(200).json({
    success: true,
    message: "Category delete successfully",
  });
};

export default { getCategory, addCategory, updateCategory, deleteCategory };
