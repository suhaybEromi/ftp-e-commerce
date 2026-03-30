export const getErrorMessage = error => {
  const data = error?.response?.data;

  if (!data) return "Something went wrong";

  // Check field errors first, then message:
  // 1- This check field errors
  const fieldErrors = data?.errors?.fieldErrors;
  if (fieldErrors) {
    const firstKey = Object.keys(fieldErrors)[0];
    if (firstKey && fieldErrors[firstKey]?.[0]) {
      return fieldErrors[firstKey][0];
    }
  }

  // 2- This check message errors(general).
  if (data.message) return data.message;
  return "Something went wrong";
};
