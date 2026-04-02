import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import path from "path";

const app = express();
app.use(cookieParser());

import brandRoutes from "./routes/brand.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import subCategoryRoutes from "./routes/subCategory.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import productRoutes from "./routes/product.routes.js";

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  }),
);

app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

const prefix = `/${process.env.PREFIX_ROUTES}`;

app.use(`${prefix}/brand`, brandRoutes);
app.use(`${prefix}/category`, categoryRoutes);
app.use(`${prefix}/subcategory`, subCategoryRoutes);
app.use(`${prefix}/collection`, collectionRoutes);
app.use(`${prefix}/product`, productRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connect");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.log("Database connection failed", err);
  }
};
connectDB();
