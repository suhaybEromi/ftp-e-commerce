import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import path from "path";

import userRoutes from "./routes/user.routes.js";
import brandRoutes from "./routes/brand.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import subCategoryRoutes from "./routes/subCategory.routes.js";
import collectionRoutes from "./routes/collection.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

// app.use(
//   cors({
//     // origin: "http://localhost:5173",
//     origin: "https://admin.ibsher.com",
//     credentials: true,
//   }),
// );

const allowedOrigins = [
  "http://localhost:5173",
  "https://admin.ibsher.com",
  "https://ibsher.com",
  "https://www.ibsher.com",
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use("/uploads", express.static(path.resolve("uploads")));

const prefix = `/${process.env.PREFIX_ROUTES}`;

app.use(`${prefix}/user`, userRoutes);
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
