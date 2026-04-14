import api from "./api";

export const authLogin = async datas => {
  const { data } = await api.post("/user/login", datas);
  return data;
};

export const authCreateUser = async datas => {
  const { data } = await api.post("/user/create-user", datas);

  return data;
};

export const authLogout = async () => {
  const data = await api.post("/user/logout");

  return data;
};

export const authCheckUser = async () => {
  const { data } = await api.get("/user/check-user");

  return data;
};

export const authRefreshToken = async () => {
  const { data } = await api.post("/user/refresh-token");

  return data;
};
