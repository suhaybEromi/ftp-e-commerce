import mongoose from "mongoose";
const { Schema } = mongoose;

const colorSchema = new Schema(
  {
    en: {
      type: String,
      required: [true, "English Color is required"],
      trim: true,
    },
    ar: { type: String, trim: true },
    ku: { type: String, trim: true },
  },
  { _id: false },
);

const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: [true, "Image url is required"],
      trim: true,
    },
    key: {
      type: String,
      required: [true, "Image key is required"],
      trim: true,
    },
  },
  { _id: false },
);

const productSchema = new Schema(
  {
    name: {
      en: { type: String, required: [true, "English name is required"] },
      ar: { type: String, required: [true, "Arabic name is required"] },
      ku: { type: String, required: [true, "Kurdish name is required"] },
    },
    description: {
      en: { type: String, required: [true, "English description is required"] },
      ar: { type: String, required: [true, "Arabic description is required"] },
      ku: { type: String, required: [true, "Kurdish description is required"] },
    },
    color: { colorSchema },

    images: {
      type: [imageSchema],
      default: [],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: "At least one image is required",
      },
    },

    itemCode: {
      type: [{ type: String, required: [true, "ItemCode is required"] }],
      default: [],
      validate: {
        validator: val => {
          return Array.isArray(val) && val.length > 0;
        },
        message: "At least one itemCode is required",
      },
    },

    sku: { type: String, trim: true, uppercase: true },

    collectionName: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
      required: [true, "Collection is required"],
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Brand is required"],
    },

    size: {
      type: [String],
      enum: ["small", "medium", "large"],
      default: [],
    },

    price: { type: Number, required: [true, "Price is required"], default: 0 },
    discountPrice: { type: Number, default: 0 },

    keyword: {
      type: [String],
      default: [],
      validate: {
        validator: val => {
          return Array.isArray(val) && val.length > 0;
        },
        message: "At least one keyword is required",
      },
    },

    stockStatus: {
      type: String,
      enum: ["in_stock", "out_of_stock"],
      default: "in_stock",
    },

    stockQuantity: {
      type: Number,
      required: [true, "Stock is required"],
      default: 0,
    },

    isFeatured: { type: Boolean, default: false },

    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating cannot exceed 5"],
    },

    points: { type: Number, default: 0 },
    cashback: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
