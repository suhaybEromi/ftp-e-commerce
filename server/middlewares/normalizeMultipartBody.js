const setDeep = (obj, path, value) => {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key] || typeof current[key] !== "object") {
        current[key] = {};
      }
      current = current[key];
    }
  }
};

const normalizeMultipartBody = (req, res, next) => {
  if (!req.body || typeof req.body !== "object") {
    return next();
  }

  const normalized = {};

  for (const key of Object.keys(req.body)) {
    const value = req.body[key];

    if (key.includes(".")) {
      setDeep(normalized, key, value);
    } else {
      normalized[key] = value;
    }
  }

  if (normalized.isActive === "true") normalized.isActive = true;
  if (normalized.isActive === "false") normalized.isActive = false;

  req.body = normalized;
  next();
};

export default normalizeMultipartBody;
