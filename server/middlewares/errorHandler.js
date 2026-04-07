const errorHandler = (err, req, res, next) => {
  console.error("Global error:", err);

  // Mongo duplicate key
  if (err.code === 11000) {
    const fields = Object.keys(err.keyPattern || {});
    let message = "Duplicate value already exists";

    console.log("Duplicate key error:", err.keyPattern);
    console.log("Duplicate key value:", err.keyValue);

    // Brand or Category standalone unique by name.en
    if (fields.length === 1 && fields.includes("name.en")) {
      message = "English name already exists";
    } else if (fields.some(field => field.includes("itemCode"))) {
      message = "Item Code already exists";
    }

    // SubCategory unique by name.en + category
    else if (fields.includes("name.en") && fields.includes("category")) {
      message = "This subcategory already exists in the selected category";
    }

    // Collection unique by name.en + subCategory
    else if (fields.includes("name.en") && fields.includes("subCategory")) {
      message = "This collection already exists in the selected subcategory";
    }

    return res.status(409).json({
      success: false,
      message,
    });
  }

  // Mongoose validation
  if (err.name === "ValidationError") {
    const errors = {};

    for (const key in err.errors) {
      errors[key] = err.errors[key].message;
    }

    return res.status(400).json({
      success: false,
      message: "Database validation failed",
      errors,
    });
  }

  // Status code
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}`,
    });
  }

  return res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
};

export default errorHandler;
