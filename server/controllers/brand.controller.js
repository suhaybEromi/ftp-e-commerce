import Brand from "../models/brand.js";
import { deleteFile } from "../utils/deleteFile.js";

const getBrand = async (req, res, next) => {
  const brands = await Brand.find().sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Brands fetched successfully",
    brands,
  });
};

const addBrand = async (req, res, next) => {
  const { name, isActive } = req.body;

  if (!req.file) {
    return res.status(400).json({
      message: "Brand image is required",
    });
  }

  const fileName = req.file.filename;
  const imagePath = `/uploads/brands/${fileName}`;
  const imageKey = `brands/${fileName}`;

  const parsedIsActive =
    typeof isActive === "undefined"
      ? true
      : isActive === true || isActive === "true";

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

const updateBrand = async (req, res, next) => {
  const { id } = req.params;
  const { name, isActive } = req.body;

  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(404).json({
      message: "Brand not found",
    });
  }

  if (name !== undefined) {
    brand.name = {
      en: name.en ?? brand.name.en,
      ar: name.ar ?? brand.name.ar,
      ku: name.ku ?? brand.name.ku,
    };
  }

  if (typeof isActive !== "undefined") {
    brand.isActive = isActive === true || isActive === "true";
  }

  if (req.file) {
    const oldImage = brand.images?.[0]?.url;

    const fileName = req.file.filename;
    const newImagePath = `/uploads/brands/${fileName}`;
    const newImageKey = `brands/${fileName}`;

    brand.images = [
      {
        url: newImagePath,
        key: newImageKey,
      },
    ];

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

const deleteBrand = async (req, res, next) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(404).json({
      message: "Brand not found",
    });
  }

  const oldImage = brand.images?.[0]?.url;

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
