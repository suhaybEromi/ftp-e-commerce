// NOTE
// canAccessProduct is used to:
// ✅ Allow:
// Admin → access ANY product
// Creator → access THEIR product
// ❌ Block:
// Other users → cannot touch someone else’s product

import Product from "../models/product.js";

const canAccessProduct = async (req, res, next) => {
  try {
    const productId = req.params.id || req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const isAdmin =
      req.user.role === "super_admin" || req.user.role === "admin";

    const isOwner = product.createdBy?.toString() === req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this product",
      });
    }

    req.product = product;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default canAccessProduct;
