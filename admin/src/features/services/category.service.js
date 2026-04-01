import api from "./api";

export const getCategory = async () => {
  const { data } = await api.get("/category");
  return data;
};

export const createCategory = async formData => {
  const { data } = await api.post("/category", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const updateCategory = async (id, formData) => {
  const { data } = await api.put(`/category/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteCategory = async id => {
  const { data } = await api.delete(`/category/${id}`);
  return data;
};
