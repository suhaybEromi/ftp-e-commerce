import mongoose from "mongoose";
const { Schema } = mongoose;

const colorSchema = new Schema(
  {
    en: {
      type: String,
      required: [true, "English Color is required"],
      trim: true,
    },
    ar: { type: String, trim: true, default: "" },
    ku: { type: String, trim: true, default: "" },
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
    alt: {
      type: String,
      default: "",
      trim: true,
    },
    isMain: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true },
);

const variantSchema = new Schema(
  {
    color: {
      type: colorSchema,
      default: () => ({ en: "", ar: "", ku: "" }),
    },

    images: {
      type: [imageSchema],
      required: true,
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length >= 1 && val.length <= 10;
        },
        message:
          "At least one image is required and no more than 10 images are allowed",
      },
    },

    stockStatus: {
      type: String,
      enum: ["in_stock", "out_of_stock"],
      required: [true, "Stock status is required"],
    },

    stockQuantity: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
      validate: {
        validator: function (val) {
          if (this.stockStatus === "in_stock") return val > 0;
          return val === 0 || val === undefined;
        },
        message:
          "Stock quantity must be greater than 0 when in stock, and 0 when out of stock",
      },
    },
  },
  { _id: true },
);

const translatedNameSchema = new Schema(
  {
    en: {
      type: String,
      required: [true, "English name is required"],
      trim: true,
    },
    ar: {
      type: String,
      required: [true, "Arabic name is required"],
      trim: true,
    },
    ku: {
      type: String,
      required: [true, "Kurdish name is required"],
      trim: true,
    },
  },
  { _id: false },
);

const translatedDescriptionSchema = new Schema(
  {
    en: {
      type: String,
      required: [true, "English description is required"],
      trim: true,
    },
    ar: {
      type: String,
      required: [true, "Arabic description is required"],
      trim: true,
    },
    ku: {
      type: String,
      required: [true, "Kurdish description is required"],
      trim: true,
    },
  },
  { _id: false },
);

const productSchema = new Schema(
  {
    name: { type: translatedNameSchema, required: true },
    description: { type: translatedDescriptionSchema, required: true },

    variants: {
      type: [variantSchema],
      default: [],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: "At least one variant is required",
      },
    },

    itemCode: {
      type: String,
      trim: true,
      uppercase: true,
      required: [true, "ItemCode is required"],
      unique: true,
      index: true,
    },

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
      type: String,
      enum: ["small", "medium", "large"],
      required: [true, "Size is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0.01, "Price must be greater than 0"],
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: [0, "Discount price cannot be negative"],
      validate: {
        validator: function (val) {
          return val === 0 || val < this.price;
        },
        message: "Discount price must be less than the original price",
      },
    },

    keyword: {
      type: [{ type: String, trim: true, lowercase: true }],
      default: [],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: "At least one keyword is required",
      },
    },

    isFeatured: { type: Boolean, default: false },

    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating cannot exceed 5"],
    },

    points: { type: Number, default: 0, min: [0, "Points cannot be negative"] },
    cashback: {
      type: Number,
      default: 0,
      min: [0, "Cashback cannot be negative"],
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
