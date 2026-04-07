import Product from "../models/product.js";
import { deleteFile } from "../utils/deleteFile.js";

const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getProduct = async (req, res) => {
  const { search = "" } = req.query;

  const trimmedSearch = String(search).trim();
  const safeSearch = trimmedSearch ? escapeRegex(trimmedSearch) : "";

  const searchQuery = safeSearch
    ? {
        $or: [
          { "name.en": { $regex: safeSearch, $options: "i" } },
          { "name.ar": { $regex: safeSearch, $options: "i" } },
          { "name.ku": { $regex: safeSearch, $options: "i" } },
          { itemCode: { $regex: safeSearch, $options: "i" } },
          { keyword: { $regex: safeSearch, $options: "i" } },
        ],
      }
    : {};

  const products = await Product.find(searchQuery)
    .sort({ createdAt: -1 })
    .populate("collectionName", "name")
    .populate("brand", "name");

  return res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
};

const addProduct = async (req, res) => {
  const {
    name,
    description,
    color,
    itemCode,
    collectionName,
    brand,
    size,
    price,
    discountPrice,
    keyword,
    stockStatus,
    stockQuantity,
    isFeatured,
    rating,
    points,
    cashback,
    isActive,
  } = req.validated.body;

  if (!req.files || req.files.length === 0) {
    const err = new Error("At least one product image is required");
    err.statusCode = 400;
    throw err;
  }

  const images = req.files.map(file => ({
    url: `/uploads/products/${file.filename}`,
    key: `products/${file.filename}`,
  }));

  const normalizedStockQuantity =
    stockStatus === "out_of_stock" ? 0 : stockQuantity;

  const product = await Product.create({
    name,
    description,
    images,
    color,
    itemCode,
    collectionName,
    brand,
    size,
    price,
    discountPrice,
    keyword,
    stockStatus,
    stockQuantity: normalizedStockQuantity,
    isFeatured,
    rating,
    points,
    cashback,
    isActive,
  });

  return res.status(201).json({
    success: true,
    message: "Product added successfully",
    product,
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.validated.params;
  const {
    name,
    description,
    color,
    itemCode,
    collectionName,
    brand,
    size,
    price,
    discountPrice,
    keyword,
    stockStatus,
    stockQuantity,
    isFeatured,
    rating,
    points,
    cashback,
    isActive,
  } = req.validated.body;

  const product = await Product.findById(id);

  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    throw err;
  }

  if (name !== undefined) {
    product.name = {
      en: name.en ?? product.name.en,
      ar: name.ar ?? product.name.ar,
      ku: name.ku ?? product.name.ku,
    };
  }

  if (description !== undefined) {
    product.description = {
      en: description.en ?? product.description.en,
      ar: description.ar ?? product.description.ar,
      ku: description.ku ?? product.description.ku,
    };
  }

  if (color !== undefined) product.color = color;
  if (itemCode !== undefined) product.itemCode = itemCode;
  if (collectionName !== undefined) product.collectionName = collectionName;
  if (brand !== undefined) product.brand = brand;
  if (size !== undefined) product.size = size;
  if (price !== undefined) product.price = price;
  if (discountPrice !== undefined) product.discountPrice = discountPrice;
  if (keyword !== undefined) product.keyword = keyword;
  if (stockStatus !== undefined) product.stockStatus = stockStatus;
  if (stockQuantity !== undefined) product.stockQuantity = stockQuantity;
  if (typeof isFeatured !== "undefined") product.isFeatured = isFeatured;
  if (rating !== undefined) product.rating = rating;
  if (points !== undefined) product.points = points;
  if (cashback !== undefined) product.cashback = cashback;
  if (typeof isActive !== "undefined") product.isActive = isActive;

  if (product.stockStatus === "out_of_stock") {
    product.stockQuantity = 0;
  }

  if (
    product.stockStatus === "in_stock" &&
    (!product.stockQuantity || product.stockQuantity <= 0)
  ) {
    const err = new Error(
      "Stock quantity must be greater than 0 when stock status is in stock",
    );
    err.statusCode = 400;
    throw err;
  }

  if (product.discountPrice > product.price) {
    const err = new Error("Discount price cannot be greater than price");
    err.statusCode = 400;
    throw err;
  }

  if (req.files && req.files.length > 0) {
    const oldImages = product.images || [];

    const newImages = req.files.map(file => ({
      url: `/uploads/products/${file.filename}`,
      key: `products/${file.filename}`,
    }));

    product.images = newImages;

    for (const image of oldImages) {
      if (image?.url) {
        deleteFile(image.url);
      }
    }
  }

  await product.save();

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.validated.params;

  const product = await Product.findById(id);

  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    throw err;
  }

  if (product.images?.length > 0) {
    for (const img of product.images) {
      if (img?.url) {
        deleteFile(img.url);
      }
    }
  }

  await product.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

export default { getProduct, addProduct, updateProduct, deleteProduct };
