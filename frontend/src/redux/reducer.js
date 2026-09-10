import {
    SET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT,
    SET_USERS, ADD_USER, CHANGE_USER,
    ADD_ORDER,
    DELETE_USER,
    DELETE_ORDER,
    SET_ORDERS
} from "./actions";

const initialState = {
    products: [],
    users: [],
    orders: [],
    curr_user: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return { ...state, products: action.payload };
        case ADD_PRODUCT:
            return { ...state, products: [...state.products, action.payload] };
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(p => p._id === action.payload._id ? action.payload : p)
            };
        case DELETE_PRODUCT:
            return { ...state, products: state.products.filter(p => p._id !== action.payload) };
        case SET_USERS:
            return { ...state, users: action.payload };
        case ADD_USER:
            return { ...state, users: [...state.users, action.payload] };
        case CHANGE_USER:
            return { ...state, curr_user: action.payload };
        case DELETE_USER:
            return {
                ...state,  users: state.users.filter(user => user._id !== action.payload)};
                case SET_ORDERS:
  return {
    ...state,
    orders: action.payload
  };
        case ADD_ORDER:
            return { ...state, orders: [...state.orders, action.payload] };
        case DELETE_ORDER:
            return {...state, orders: state.orders.filter(order => order._id !== action.payload)};
        default:
            return state;
    }
};

export default reducer;
