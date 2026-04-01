import Collection from "../models/collection.js";
import { deleteFile } from "../utils/deleteFile.js";

// Functionality Fetch Collection
const getCollection = async (req, res, next) => {
  const collections = await Collection.find()
    .populate("subCategory")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Collection fetched successfully",
    collections,
  });
};

// Functionality Add Collection
const addCollection = async (req, res, next) => {
  const { name, subCategory, isActive } = req.validated.body;

  // Validate file
  if (!req.file) {
    const err = new Error("Collection image is required");
    err.statusCode = 400;
    throw err;
  }

  // Name file path
  const fileName = req.file.filename;
  const imagePath = `/uploads/collection/${fileName}`;
  const imageKey = `collection/${fileName}`;

  // Validate isActive, if type undefined chnage to true or isActive
  const parsedIsActive = typeof isActive === "undefined" ? true : isActive;

  // Create collection
  const collection = await Collection.create({
    name,
    subCategory,
    images: [{ url: imagePath, key: imageKey }],
    isActive: parsedIsActive,
  });

  return res.status(201).json({
    success: true,
    message: "Collection added successfully",
    collection,
  });
};

// Functionality Update Collection
const updateCollection = async (req, res, next) => {
  const { id } = req.validated.params;

  const { name, subCategory, isActive } = req.validated.body;

  // Find collection by id
  const collection = await Collection.findById(id);

  // There is a collection or there is not
  if (!collection) {
    const err = new Error("Collection not found");
    err.statusCode = 404;
    throw err;
  }

  // Validate name undefined or not
  if (name !== undefined) {
    collection.name = {
      en: name.en ?? collection.name.en,
      ar: name.ar ?? collection.name.ar,
      ku: name.ku ?? collection.name.ku,
    };
  }

  // Validate subCategory undefined or not
  if (subCategory !== undefined) {
    collection.subCategory = subCategory;
  }

  // Validate isActice undefined or not
  if (typeof isActive !== "undefined") {
    collection.isActive = isActive;
  }

  // Check file
  if (req.file) {
    // Old image
    const oldImage = collection.images?.[0]?.url;

    // Name file path and new image
    const fileName = req.file.filename;
    const newImagePath = `/uploads/collection/${fileName}`;
    const newImageKey = `collection/${fileName}`;

    // Send image
    collection.images = [{ url: newImagePath, key: newImageKey }];

    // Delete old image if insert new image
    if (oldImage) {
      deleteFile(oldImage);
    }
  }

  await collection.save();

  return res.status(200).json({
    success: true,
    message: "Collection updated successfully",
    collection,
  });
};

// Functionality Delete Collection
const deleteCollection = async (req, res, next) => {
  const { id } = req.validated.params;

  // Find collection by id
  const collection = await Collection.findById(id);

  // There is a collection or there is not collection
  if (!collection) {
    const err = new Error("Collection not found");
    err.statusCode = 404;
    throw err;
  }

  // Old image
  const oldImage = collection.images?.[0]?.url;

  // Delete old image
  if (oldImage) {
    deleteFile(oldImage);
  }

  await Collection.deleteOne({ _id: id });

  return res.status(200).json({
    success: true,
    message: "Collection deleted successfully",
  });
};

export default {
  getCollection,
  addCollection,
  updateCollection,
  deleteCollection,
};
