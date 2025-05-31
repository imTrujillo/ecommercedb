import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

const baseUrl = "https://localhost:7160/api/";

export const apiServiceGet = async (endpoint, id) => {
  try {
    let url = "";
    if (id === "") {
      url = `${baseUrl}${endpoint}`;
    } else {
      url = `${baseUrl}${endpoint}${id}`;
    }

    console.log("URL a llamar:", url);

    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Ocurrió un error", error.message);
    return [];
  }
};

export const apiServicePost = async (endpoint, object) => {
  try {
    const response = await axios.post(baseUrl + endpoint, object);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Ocurrió un error", error.message);
    return [];
  }
};

export const apiServiceUpdate = async (endpoint, object) => {
  try {
    const response = await axios.put(baseUrl + endpoint, object);
    if (response.status == 200) {
      toast.success("¡Actualización exitosa!");
      return response.data;
    }
  } catch (error) {
    console.error("Ocurrió un error", error.message);
    return [];
  }
};

export const apiServiceDelete = async (endpoint) => {
  try {
    const response = await axios.delete(baseUrl + endpoint);
    if (response.status == 200) {
      toast.success("¡Elemento borrado exitosamente!");
      return response.data;
    }
  } catch (error) {
    console.error("Ocurrió un error", error.message);
    return [];
  }
};
