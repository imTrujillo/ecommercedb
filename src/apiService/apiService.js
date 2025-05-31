import axios from "axios";
import React from "react";

const baseUrl = "https://localhost:7160/api/";

export const apiServiceGet = async (endpoint, id) => {
  try {
    const response = await axios.get(baseUrl + endpoint + id);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Ocurrió un error", error.message);
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
  }
};

export const apiServiceUpdate = async (endpoint, object) => {
  try {
    const response = await axios.put(baseUrl + endpoint, object);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Ocurrió un error", error.message);
  }
};

export const apiServiceDelete = async (endpoint) => {
  try {
    const response = await axios.delete(baseUrl + endpoint);
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Ocurrió un error", error.message);
  }
};
