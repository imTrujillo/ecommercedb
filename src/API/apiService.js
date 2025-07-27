import axios from "axios";

import { toast } from "react-toastify";

const baseUrl = "https://localhost:7160/api/";

export const apiServiceGet = async (endpoint, id, token = null) => {
  try {
    const url = id ? baseUrl + endpoint + "/" + id : baseUrl + endpoint;

    const response = await axios.get(
      url,
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );
    if (response.status === 200) {
      return response.data;
    } else {
      // Si el status no es 200, devolver un array vacío o null
      console.warn(
        `La API respondió con estado ${response.status} para ${url}`
      );
      return []; // Devolver un array vacío por defecto para listas
    }
  } catch (error) {
    console.error("Ocurrió un error", error.message);

    return [];
  }
};

export const apiServicePost = async (endpoint, object, token = null) => {
  try {
    const response = await axios.post(
      baseUrl + endpoint,
      object,
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error("Ocurrió un error", error.message);

    return [];
  }
};

export const apiServiceUpdate = async (endpoint, object, token = null) => {
  try {
    const response = await axios.put(
      baseUrl + endpoint,
      object,
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );

    if (response.status >= 200 && response.status < 300) {
      // Consideracion de todos los 2xx

      return response.data;
    } else {
      console.warn(
        `La API respondió con estado ${response.status} para PUT ${
          baseUrl + endpoint
        }.`
      );
      return null; // Devuelve null si no es 2xx
    }
  } catch (error) {
    console.error("Ocurrió un error", error.message);

    return [];
  }
};

export const apiServiceDelete = async (endpoint, token = null) => {
  try {
    const response = await axios.delete(
      baseUrl + endpoint,
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );

    if (response.status == 200) {
      toast.success("¡Elemento borrado exitosamente!");
      return response.data;
    }
  } catch (error) {
    console.error("Ocurrió un error", error.message);
    return [];
  }
};
