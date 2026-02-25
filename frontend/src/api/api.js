import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getProducts = () => axios.get(`${API}/api/products`);
export const createProduct = data => axios.post(`${API}/api/products`, data);
export const updateProduct = (id, data) => axios.put(`${API}/api/products/${id}`, data);
export const deleteProduct = id => axios.delete(`${API}/api/products/${id}`);
export const getProduct = id => axios.get(`${API}/api/products/${id}`);