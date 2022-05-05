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
  UPDATE_CART,
  SET_SEARCH
} from "./constants";
const initState = {
  allProduct: [],
  onePageProduct: [],
  numberPageProduct: 1,
  typeProduct: "",
  allTypeProduct: [],
  email: "",
  password: "",
  userLogin: {},
  statusLogin: "",
  carts: [],
  updateCart: 1,
  search:""
};

function reducer(state, action) {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return {
        ...state,
        allProduct: action.payload,
      };
    case SET_ONE_PAGE_PRODUCT:
      if (action.payload) {
        return {
          ...state,
          onePageProduct: [...state.onePageProduct, action.payload],
        };
      } else {
        return {
          ...state,
          onePageProduct: [],
        };
      }
    case SET_NUMBER_PAGE_PRODUCT:
      return {
        ...state,
        numberPageProduct: action.payload,
      };
    case SET_TYPE_PRODUCT:
      return {
        ...state,
        typeProduct: action.payload,
      };
    case SET_ALL_TYPE_PRODUCT:
      return {
        ...state,
        allTypeProduct: action.payload,
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_USER_LOGIN:
      return {
        ...state,
        userLogin: action.payload,
      };
    case SET_STATUS_LOGIN:
      return {
        ...state,
        statusLogin: action.payload,
      };

    case SET_CARTS:
          return {
            ...state,
            carts: action.payload,
          };
    case SET_SEARCH:
          return {
            ...state,
            search: action.payload,
          };
    case UPDATE_CART:
          return {
            ...state,
            updateCart: prev => prev+1
          };
    default:
      throw new Error("Unknown action type: " + action.type);
  }
}

export { initState };
export default reducer;
