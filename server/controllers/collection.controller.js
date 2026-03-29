import Collection from "../models/collection.js";
import { deleteFile } from "../utils/deleteFile.js";

const getCollection = async (req, res, next) => {
  const collections = await Collection.find().sort({ createdAt: -1 });
  // .populate("subCategory", "name")
  return res.status(200).json({
    success: true,
    message: "Collection fetched successfully",
    collections,
  });
};

const addCollection = async (req, res, next) => {
  const { name, subCategory, isActive } = req.validated.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Brand image is required",
    });
  }

  const fileName = req.file.filename;
  const imagePath = `/uploads/collection/${fileName}`;
  const imageKey = `collection/${fileName}`;

  const collection = await Collection.create({
    name,
    subCategory,
    images: [{ url: imagePath, key: imageKey }],
    isActive,
  });

  return res.status(201).json({
    success: true,
    message: "Collection added successfully",
    collection,
  });
};

const updateCollection = async (req, res, next) => {
  const { id } = req.validated.params;

  const { name, subCategory, isActive } = req.validated.body;

  const collection = await Collection.findById(id);

  if (!collection)
    return res
      .status(404)
      .json({ success: false, message: "Collection not found" });

  if (name !== undefined) {
    collection.name = {
      en: name.en ?? collection.name.en,
      ar: name.ar ?? collection.name.ar,
      ku: name.ku ?? collection.name.ku,
    };
  }

  if (subCategory !== undefined) {
    collection.subCategory = subCategory;
  }

  if (typeof isActive !== "undefined") {
    collection.isActive = isActive;
  }

  if (req.file) {
    const oldImage = collection.images?.[0]?.url;

    const fileName = req.file.filename;
    const newImagePath = `/uploads/collection/${fileName}`;
    const newImageKey = `collection/${fileName}`;

    collection.images = [
      {
        url: newImagePath,
        key: newImageKey,
      },
    ];

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

const deleteCollection = async (req, res, next) => {
  const { id } = req.validated.params;

  const collection = await Collection.findById(id);

  if (!collection) {
    return res.status(404).json({
      success: false,
      message: "Collection not found",
    });
  }

  const oldImage = collection.images?.[0]?.url;

  if (oldImage) {
    deleteFile(oldImage);
  }

  await Collection.deleteOne({ _id: id });

  return res
    .status(200)
    .json({ success: true, message: "Collection deleted successfully" });
};

export default {
  getCollection,
  addCollection,
  updateCollection,
  deleteCollection,
};
