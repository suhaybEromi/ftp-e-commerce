import api from "./api";

export const getSubCategory = async () => {
  const { data } = await api.get("/subcategory");
  return data;
};

export const addSubCategory = async formData => {
  const { data } = await api.post("/subcategory", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateSubCategory = async (id, formData) => {
  const { data } = await api.put(`/subcategory/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteSubCategory = async id => {
  const { data } = await api.delete(`/subcategory/${id}`);
  return data;
};
