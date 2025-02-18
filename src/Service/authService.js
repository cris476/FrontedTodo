import api from "./axiosConfig";


 // llamamos a la api para hacer login
export const login = async (credentials) => {
  return await api.post("/login", credentials);
};

// llamamos a la api para hacer registro
export const register = async (userData) => {
  return await api.post("/register", userData);
}; 

// llamamos a la api para hacer logout
export const logout = async () => {
  return await api.delete("/logout");
};
