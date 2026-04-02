import api from "./api";

export const getProducts = async (query = "") => {
  const { data } = await api.get(`/product${query}`);
  return data;
};

export const createProduct = async formData => {
  const { data } = await api.post("/product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateProduct = async (id, formData) => {
  const { data } = await api.put(`/product/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteProduct = async id => {
  const { data } = await api.delete(`/product/${id}`);
  return data;
};
