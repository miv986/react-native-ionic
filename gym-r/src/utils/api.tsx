import axios from "axios";

// Crear una instancia de Axios
export const api = axios.create({
  baseURL: "http://localhost:8080", // Cambia la URL a la de tu backend
  timeout: 1000, // Tiempo de espera para la petición
  headers: { "Content-Type": "application/json" },
});
