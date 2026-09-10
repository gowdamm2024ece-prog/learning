import axios from "axios";
import {
  set_products,
  set_users,
  add_product,
  add_user,
  add_order,
  delete_product,
  update_product,
  delete_user,
  delete_order,
  set_orders
} from "./actions";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/* ================= PRODUCTS ================= */

// Fetch all products
export const fetchProducts = () => async (dispatch) => {
  try {
    console.log('Fetching products from:', `${API_BASE}/api/products`);
    const res = await axios.get(`${API_BASE}/api/products`);
    console.log('Products fetched:', res.data);
    dispatch(set_products(res.data));
  } catch (err) {
    console.error("Error fetching products", err);
    console.error("API_BASE:", API_BASE);
  }
};

// Add product
export const createProduct = (product) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_BASE}/api/products`, product);
    dispatch(add_product(res.data));
  } catch (err) {
    console.error("Error adding product", err);
    throw err;
  }
};

// Delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE}/api/products/${id}`);
    dispatch(delete_product(id));
  } catch (err) {
    console.error("Error deleting product", err);
  }
};

// Update product
export const updateProduct = (id, data) => async (dispatch) => {
  try {
    const res = await axios.put(`${API_BASE}/api/products/${id}`, {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock)
    });
    dispatch(update_product(res.data));
  } catch (err) {
    console.error("Error updating product", err);
  }
};

/* ================= USERS ================= */

export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_BASE}/api/users`);
    dispatch(set_users(res.data));
  } catch (err) {
    console.error("Error fetching users", err);
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_BASE}/api/users/register`, user);
    dispatch(add_user(res.data));
    return res.data;
  } catch (err) {
    console.error("Error adding user", err);
    throw err;
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_BASE}/api/users/login`, credentials);
    return res.data;
  } catch (err) {
    console.error("Error logging in", err);
    throw err;
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE}/api/users/${id}`);
    dispatch(delete_user(id));
  } catch (err) {
    console.error("Error deleting user", err);
  }
};

/* ================= ORDERS ================= */

export const createOrder = (order) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_BASE}/api/orders`, order);
    dispatch(add_order(res.data));
  } catch (err) {
    console.error("Error adding order", err);
  }
};

export const fetchOrders = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_BASE}/api/orders`);
    dispatch(set_orders(res.data));
  } catch (err) {
    console.error("Error fetching orders", err);
  }
};

// Delete order
export const updateOrder = (id, data) => async (dispatch) => {
  try {
    const res = await axios.put(`${API_BASE}/api/orders/${id}`, data);
    dispatch(fetchOrders()); // Refetch orders to get updated data
    return res.data;
  } catch (err) {
    console.error("Error updating order", err);
    throw err;
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE}/api/orders/${id}`);
    dispatch(delete_order(id));
  } catch (err) {
    console.error("Error deleting order", err);
  }
};