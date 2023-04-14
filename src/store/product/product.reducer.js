import { PRODUCT_ACTION_TYPES } from "./product.types";

const INITIAL_PRODUCT_STATE = {
  products: null,
  productDetail: null,
  error: null,
};

export const productReducer = (state = INITIAL_PRODUCT_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: payload, isLoading: false };
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_DETAILS_SUCCESS:
      return { ...state, productDetail: payload, isLoading: false };
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_FAILED:
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_DETAILS_FAILED:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};
