const parseProductFormData = (req, res, next) => {
  try {
    const fields = ["name", "description", "keyword", "variants"];

    for (const field of fields) {
      if (typeof req.body[field] === "string") {
        const value = req.body[field].trim();

        if (value.startsWith("{") || value.startsWith("[")) {
          req.body[field] = JSON.parse(value);
        }
      }
    }

    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format in form-data fields",
    });
  }
};

export default parseProductFormData;
