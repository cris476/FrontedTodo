import api from "./axiosConfig";

export const login = async (credentials) => {
  return await api.post("/login", credentials);
};

export const register = async (userData) => {
  return await api.post("/register", userData);
}; 

export const logout = async () => {
  return await api.delete("/logout");
};
