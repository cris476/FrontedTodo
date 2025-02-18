import axios from "axios";

const API_URL = "http://127.0.0.1:9000/api";

 // Creamos una instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
 // Interceptor para enviar el token en cada petición
api.interceptors.request.use(
  (config) => {
    // Obtenemos el token del localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Si existe un token lo añadimos a los headers de la petición
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
