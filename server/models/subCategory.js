import mongoose from "mongoose";
const { Schema } = mongoose;

const subCategorySchema = new Schema(
  {
    name: {
      en: { type: String, required: [true, "English name is required"] },
      ar: { type: String, required: [true, "Arabic name is required"] },
      ku: { type: String, required: [true, "Kurdish name is required"] },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category name is required"],
    },
    images: {
      type: [
        {
          url: { type: String, required: [true, "Image url is required"] },
          key: { type: String, required: [true, "Image key is required"] },
        },
      ],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: "At least one image is required",
      },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

subCategorySchema.index({ "name.en": 1, category: 1 }, { unique: true });

export default mongoose.model("SubCategory", subCategorySchema);
