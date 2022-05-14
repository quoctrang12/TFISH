import {
  SET_ALL_PRODUCTS,
  SET_ONE_PAGE_PRODUCT,
  SET_NUMBER_PAGE_PRODUCT,
  SET_TYPE_PRODUCT,
  SET_ALL_TYPE_PRODUCT,
  SET_PASSWORD,
  SET_EMAIL,
  SET_USER_LOGIN,
  SET_STATUS_LOGIN,
  SET_CARTS,
  UPDATE,
  SET_SEARCH,
  SET_ALL_USERS,
  SET_ALL_BILLS
} from "./constants";

export const setAllProducts = (payload) => ({
  type: SET_ALL_PRODUCTS,
  payload,
});
export const setAllUsers = (payload) => ({
  type: SET_ALL_USERS,
  payload,
});
export const setAllBills = (payload) => ({
  type: SET_ALL_BILLS,
  payload,
});
export const setOnePageProduct = (payload) => ({
  type: SET_ONE_PAGE_PRODUCT,
  payload,
});
export const setNumberPageProduct = (payload) => ({
  type: SET_NUMBER_PAGE_PRODUCT,
  payload,
});
export const setTypeProduct = (payload) => ({
  type: SET_TYPE_PRODUCT,
  payload,
});
export const setALLTypeProduct = (payload) => ({
  type: SET_ALL_TYPE_PRODUCT,
  payload,
});
export const setPassword = (payload) => ({
  type: SET_PASSWORD,
  payload,
});
export const setEmail = (payload) => ({
  type: SET_EMAIL,
  payload,
});
export const setUserLogin = (payload) => ({
  type: SET_USER_LOGIN,
  payload,
});
export const setStatusLogin = (payload) => ({
  type: SET_STATUS_LOGIN,
  payload,
});
export const setCarts = (payload) => ({
  type: SET_CARTS,
  payload,
});
export const update = () => ({
  type: UPDATE
});
export const setSearch = (payload) => ({
  type: SET_SEARCH,
  payload,
});
