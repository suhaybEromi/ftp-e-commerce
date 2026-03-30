import Brand from "../models/brand.js";
import { deleteFile } from "../utils/deleteFile.js";

// Functionality Fetch Brand
const getBrand = async (req, res) => {
  const brands = await Brand.find().sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Brands fetched successfully",
    brands,
  });
};

// Functionality Add Brand
const addBrand = async (req, res) => {
  const { name, isActive } = req.validated.body;

  // Validate file
  if (!req.file) {
    const err = new Error("Brand image is required");
    err.statusCode = 400;
    throw err;
  }

  // Name file path
  const fileName = req.file.filename;
  const imagePath = `/uploads/brands/${fileName}`;
  const imageKey = `brands/${fileName}`;

  // Validate isActive, if type undefined chnage to true or isActive
  const parsedIsActive = typeof isActive === "undefined" ? true : isActive;

  // Create brand
  const brand = await Brand.create({
    name,
    images: [{ url: imagePath, key: imageKey }],
    isActive: parsedIsActive,
  });

  return res.status(201).json({
    success: true,
    message: "Brand added successfully",
    brand,
  });
};

// Functionality Update Brand
const updateBrand = async (req, res) => {
  const { id } = req.validated.params;
  const { name, isActive } = req.validated.body;

  // Find brand by id
  const brand = await Brand.findById(id);

  // There is a brand or there is not
  if (!brand) {
    const err = new Error("Brand not found");
    err.statusCode = 404;
    throw err;
  }

  // Validate name undefined or not
  if (name !== undefined) {
    brand.name = {
      en: name.en ?? brand.name.en,
      ar: name.ar ?? brand.name.ar,
      ku: name.ku ?? brand.name.ku,
    };
  }

  // Validate isActice undefined or not
  if (typeof isActive !== "undefined") {
    brand.isActive = isActive;
  }

  // Check file.
  if (req.file) {
    // Old image
    const oldImage = brand.images?.[0]?.url;

    // Name file path and new image
    const fileName = req.file.filename;
    const newImagePath = `/uploads/brands/${fileName}`;
    const newImageKey = `brands/${fileName}`;

    // Send image
    brand.images = [{ url: newImagePath, key: newImageKey }];

    // Delete old image if insert new image
    if (oldImage) {
      deleteFile(oldImage);
    }
  }

  await brand.save();

  return res.status(200).json({
    success: true,
    message: "Brand updated successfully",
    brand,
  });
};

// Functionality Delete Brand
const deleteBrand = async (req, res) => {
  const { id } = req.validated.params;

  // Find brand by id
  const brand = await Brand.findById(id);

  // There is a brand or there is not brand
  if (!brand) {
    const err = new Error("Brand not found");
    err.statusCode = 404;
    throw err;
  }

  // Old image
  const oldImage = brand.images?.[0]?.url;

  // Delete old image
  if (oldImage) {
    deleteFile(oldImage);
  }

  await Brand.deleteOne({ _id: id });

  return res.status(200).json({
    success: true,
    message: "Brand deleted successfully",
  });
};

export default { getBrand, addBrand, updateBrand, deleteBrand };
