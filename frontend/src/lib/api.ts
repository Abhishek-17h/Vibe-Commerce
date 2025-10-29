import axios from "axios";
import type { Product, CartResponse, Receipt } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const client = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const getProducts = async () => {
  const { data } = await client.get<Product[]>("/api/products");
  return data;
};

export const getCart = async () => {
  const { data } = await client.get<CartResponse>("/api/cart");
  return data;
};

export const addToCart = async (productId: string, qty: number) => {
  const { data } = await client.post<{ message: string }>("/api/cart", {
    productId,
    qty,
  });
  return data;
};

export const removeFromCart = async (cartItemId: string) => {
  const { data } = await client.delete<{ message: string }>(`/api/cart/${cartItemId}`);
  return data;
};

export const checkout = async (payload: { name: string; email: string }) => {
  const { data } = await client.post<Receipt>("/api/cart/checkout", payload);
  return data;
};

