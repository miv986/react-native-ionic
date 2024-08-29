import { api } from "../utils/api";
// Importa la configuración de Axios
import axios from "axios";

// Función para registrar un usuario
export const registerUser = async (
  email: string,
  password: string,
  usuario: string
) => {
  try {
    const response = await api.post("/usuarios/registro", {
      email: email,
      password: password,
      usuario: usuario,
    });
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    // Manejo de errores
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data || "Error en el registro");
      } else {
        throw new Error("Error en la petición");
      }
    } else {
      throw new Error("Ocurrió un error inesperado");
    }
  }
};

// Función para loguear un usuario
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/usuarios/login", {
      email: email,
      password: password,
    });
    console.log(response.data);
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    // Manejo de errores
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Error en la petición");
      }
    } else {
      throw new Error("Ocurrió algo inesperado");
    }
  }
};
