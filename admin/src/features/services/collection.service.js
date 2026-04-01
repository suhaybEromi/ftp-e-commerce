import api from "./api";

export const getCollection = async () => {
  const { data } = await api.get("/collection");
  return data;
};

export const addCollection = async formData => {
  const { data } = await api.post("/collection", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateCollection = async (id, formData) => {
  const { data } = await api.put(`/collection/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteCollection = async id => {
  const { data } = await api.delete(`/collection/${id}`);
  return data;
};
