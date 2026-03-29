import mongoose from "mongoose";

export const objectIdSchema = (fieldName = "id") =>
  mongoose.isValidObjectId
    ? {
        [fieldName]: value => mongoose.isValidObjectId(value),
      }
    : {
        [fieldName]: value => /^[a-f\d]{24}$/i.test(value),
      };
