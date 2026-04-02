import Product from "../models/product.js";

const getProduct = async (req, res) => {
  const { search = "" } = req.query;

  const searchQuery = search
    ? {
        $or: [
          { "name.en": { $regex: search, $options: "i" } },
          { "name.ar": { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const products = await Product.find(searchQuery).sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
};

const addProduct = async (req, res) => {
  const {} = req.body;
};

const updateProduct = async (req, res) => {};

const deleteProduct = async (req, res) => {};

export default { getProduct, addProduct, updateProduct, deleteProduct };
