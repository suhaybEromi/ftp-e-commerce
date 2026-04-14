import Product from "../models/product.js";
import { deleteFile } from "../utils/deleteFile.js";

const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildImageObject = file => ({
  url: `/uploads/products/${file.filename}`,
  key: `products/${file.filename}`,
  alt: "",
  isMain: false,
});

const buildVariantsWithImages = (variants = [], files = []) => {
  return variants.map((variant, index) => {
    const variantFiles = files.filter(
      file => file.fieldname === `variant_${index}_images`,
    );

    return {
      color: variant.color,
      stockStatus: variant.stockStatus,
      stockQuantity:
        variant.stockStatus === "out_of_stock"
          ? 0
          : Number(variant.stockQuantity || 0),
      images: variantFiles.map((file, fileIndex) => ({
        ...buildImageObject(file),
        isMain: fileIndex === 0,
      })),
    };
  });
};

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
        ],
      }
    : {};

  const isAdmin = req.user.role === "super_admin" || req.user.role === "admin";

  if (!isAdmin) {
    searchQuery.createdBy = req.user.id;
  }

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
    variants,
    itemCode,
    collectionName,
    brand,
    size,
    price,
    discountPrice,
    keyword,
    warranty,
    isFeatured,
    rating,
    points,
    cashback,
    isActive,
  } = req.validated.body;

  if (!Array.isArray(variants) || variants.length === 0) {
    const err = new Error("At least one variant is required");
    err.statusCode = 400;
    throw err;
  }

  const builtVariants = buildVariantsWithImages(variants, req.files || []);

  for (const variant of builtVariants) {
    if (!variant.images || variant.images.length === 0) {
      const err = new Error("Each variant must have at least one image");
      err.statusCode = 400;
      throw err;
    }
  }

  // const normalizedWarranty =
  // warranty && Object.keys(warranty).length > 0 ? warranty : undefined;

  const product = await Product.create({
    name,
    description,
    variants: builtVariants,
    itemCode,
    collectionName,
    brand,
    size,
    price,
    discountPrice,
    keyword,
    status: "pending",
    warranty,
    isFeatured,
    rating,
    points,
    cashback,
    isActive,
    createdBy: req.user.id,
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
    variants,
    itemCode,
    collectionName,
    brand,
    size,
    price,
    discountPrice,
    keyword,
    warranty,
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

  if (itemCode !== undefined) product.itemCode = itemCode;
  if (collectionName !== undefined) product.collectionName = collectionName;
  if (brand !== undefined) product.brand = brand;
  if (size !== undefined) product.size = size;
  if (price !== undefined) product.price = price;
  if (discountPrice !== undefined) product.discountPrice = discountPrice;
  if (keyword !== undefined) product.keyword = keyword;
  if (warranty !== undefined) product.warranty = warranty;

  // if (warranty !== undefined) {
  //   if (!warranty || Object.keys(warranty).length === 0) {
  //     product.warranty = undefined;
  //   } else {
  //     product.warranty = warranty;
  //   }
  // }

  if (typeof isFeatured !== "undefined") product.isFeatured = isFeatured;
  if (rating !== undefined) product.rating = rating;
  if (points !== undefined) product.points = points;
  if (cashback !== undefined) product.cashback = cashback;
  if (typeof isActive !== "undefined") product.isActive = isActive;

  if (discountPrice !== undefined && discountPrice > product.price) {
    const err = new Error("Discount price cannot be greater than price");
    err.statusCode = 400;
    throw err;
  }

  // Update variants metadata only if sent
  if (Array.isArray(variants)) {
    const existingImagesMap = new Map();

    product.variants.forEach(variant => {
      existingImagesMap.set(
        variant._id.toString(),
        variant.images ? [...variant.images] : [],
      );
    });

    const newFiles = req.files || [];

    product.variants = variants.map((variant, index) => {
      const existingVariantId = variant._id;
      const oldImages = existingVariantId
        ? existingImagesMap.get(String(existingVariantId)) || []
        : [];

      const uploadedFiles = newFiles.filter(
        file => file.fieldname === `variant_${index}_images`,
      );

      let nextImages = oldImages;

      if (uploadedFiles.length > 0) {
        // 5) update product can delete old images too early
        // In updateProduct, when uploading new files for one variant, you do this:
        for (const oldImage of oldImages) {
          if (oldImage?.url) {
            deleteFile(oldImage.url);
          }
        }

        nextImages = uploadedFiles.map((file, fileIndex) => ({
          ...buildImageObject(file),
          isMain: fileIndex === 0,
        }));
      }

      return {
        _id: existingVariantId,
        color: variant.color,
        stockStatus: variant.stockStatus,
        stockQuantity:
          variant.stockStatus === "out_of_stock"
            ? 0
            : Number(variant.stockQuantity || 0),
        images: nextImages,
      };
    });
  }

  await product.save();

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
};

const updateStatus = async (req, res) => {
  const { status } = req.validated.body;
  const { id } = req.validated.params;

  if (!["approved", "rejected", "pending"].includes(status)) {
    const err = new Error("Status must be approve or reject or pending");
    err.statusCode = 400;
    throw err;
  }

  const item = await Product.findById(id);

  if (!item) {
    const err = new Error("Item not found");
    err.statusCode = 404;
    throw err;
  }

  item.status = status;

  await item.save();

  return res.status(200).json({
    success: true,
    message: `Status ${status} successfully`,
    item,
  });
};

const updateSingleVariantImage = async (req, res) => {
  const { productId, variantId, imageId } = req.validated.params;

  const product = await Product.findById(productId);

  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    throw err;
  }

  const variant = product.variants.id(variantId);

  if (!variant) {
    const err = new Error("Variant not found");
    err.statusCode = 404;
    throw err;
  }

  const image = variant.images.id(imageId);

  if (!image) {
    const err = new Error("Image not found");
    err.statusCode = 404;
    throw err;
  }

  if (!req.file) {
    const err = new Error("New image file is required");
    err.statusCode = 400;
    throw err;
  }

  if (image?.url) {
    deleteFile(image.url);
  }

  image.url = `/uploads/products/${req.file.filename}`;
  image.key = `products/${req.file.filename}`;

  await product.save();

  return res.status(200).json({
    success: true,
    message: "Variant image updated successfully",
    product,
  });
};

const deleteSingleVariantImage = async (req, res) => {
  const { productId, variantId, imageId } = req.validated.params;

  const product = await Product.findById(productId);

  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    throw err;
  }

  const variant = product.variants.id(variantId);

  if (!variant) {
    const err = new Error("Variant not found");
    err.statusCode = 404;
    throw err;
  }

  if (!variant.images || variant.images.length <= 1) {
    const err = new Error("At least one image must remain in this variant");
    err.statusCode = 400;
    throw err;
  }

  const image = variant.images.id(imageId);

  if (!image) {
    const err = new Error("Image not found");
    err.statusCode = 404;
    throw err;
  }

  if (image?.url) {
    deleteFile(image.url);
  }

  variant.images.pull(imageId);

  await product.save();

  return res.status(200).json({
    success: true,
    message: "Variant image deleted successfully",
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

  if (product.variants?.length > 0) {
    for (const variant of product.variants) {
      if (variant.images?.length > 0) {
        for (const img of variant.images) {
          if (img?.url) {
            deleteFile(img.url);
          }
        }
      }
    }
  }

  await product.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

export default {
  getProduct,
  addProduct,
  updateProduct,
  updateStatus,
  updateSingleVariantImage,
  deleteSingleVariantImage,
  deleteProduct,
};
