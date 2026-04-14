import mongoose from "mongoose";
const { Schema } = mongoose;

const brandSchema = new Schema(
  {
    name: {
      en: { type: String, required: [true, "English name is required"] },
      ar: { type: String, required: [true, "Arabic name is required"] },
      ku: { type: String, required: [true, "Kurdish name is required"] },
    },

    // NOTE: The same code with category and sub category, collection and product.
    // tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", default: null },

    // scope: { type: String, enum: ["private", "global"], default: "private" },

    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "Creator is required"],
    // },

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

brandSchema.index({ "name.en": 1 }, { unique: true });

export default mongoose.model("Brand", brandSchema);
