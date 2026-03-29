export const getErrorMessage = error => {
  const data = error?.response?.data;

  if (!data) return "Something went wrong";

  if (data.message) return data.message;

  const fieldErrors = data?.errors?.fieldErrors;
  if (fieldErrors) {
    const firstKey = Object.keys(fieldErrors)[0];
    if (firstKey && fieldErrors[firstKey]?.[0]) {
      return fieldErrors[firstKey][0];
    }
  }
  return "Something went wrong";
};
