import api from "./api";

export const getBrands = async () => {
  const { data } = await api.get("/brand");
  return data;
};

export const createBrand = async formData => {
  const { data } = await api.post("/brand", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateBrand = async (id, formData) => {
  const { data } = await api.put(`/brand/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteBrand = async id => {
  const { data } = await api.delete(`/brand/${id}`);
  return data;
};
