// Action types
export const SET_PRODUCTS = "SET_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const SET_USERS = "SET_USERS";
export const ADD_USER = "ADD_USER";
export const CHANGE_USER = "CHANGE_USER";
export const DELETE_USER = "DELETE_USER";

export const SET_ORDERS = "SET_ORDERS";
export const ADD_ORDER = "ADD_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";

export const set_products = (products) => ({ type: SET_PRODUCTS, payload: products });
export const add_product = (product) => ({ type: ADD_PRODUCT, payload: product });
export const update_product = (product) => ({ type: UPDATE_PRODUCT, payload: product });
export const delete_product = (id) => ({ type: DELETE_PRODUCT, payload: id });

export const set_users = (users) => ({ type: SET_USERS, payload: users });
export const add_user = (user) => ({ type: ADD_USER, payload: user });
export const change_user = (userId) => ({ type: CHANGE_USER, payload: userId });
export const delete_user = (id) => ({type: DELETE_USER, payload: id});


export const set_orders = (orders) => ({type: SET_ORDERS,payload: orders});
export const add_order = (order) => ({ type: ADD_ORDER, payload: order });
export const delete_order = (id) => ({type: DELETE_ORDER, payload: id});

