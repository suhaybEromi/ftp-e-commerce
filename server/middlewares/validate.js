const validate = schema => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body ?? {},
    params: req.params ?? {},
    query: req.query ?? {},
  });

  if (!result.success) {
    const fieldErrors = {};
    const formErrors = [];

    for (const issue of result.error.issues) {
      const path = issue.path.join(".");

      if (path) {
        if (!fieldErrors[path]) fieldErrors[path] = [];
        fieldErrors[path].push(issue.message);
      } else {
        formErrors.push(issue.message);
      }
    }

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: {
        formErrors,
        fieldErrors,
      },
    });
  }

  // In controller, use validated data, not raw req.body.
  // req.body❌
  // req.validated.body✅
  req.validated = result.data;
  next();
};

export default validate;
