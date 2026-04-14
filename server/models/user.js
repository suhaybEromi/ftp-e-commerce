import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },

    email: {
      type: String,
      required: [true, "E-Mail is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    role: {
      type: String,
      enum: ["super_admin", "admin", "data_entry"],
      default: "data_entry",
    },

    // 🔥 IMPORTANT (for future multi-tenant)
    // tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", default: null },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
