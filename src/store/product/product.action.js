import { PRODUCT_ACTION_TYPES } from "./product.types";

import api from "../../api/api";

export const setFetchProductsStart = (categoryId, currentPage) => ({
  type: PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_START,
  payload: { categoryId, currentPage },
});

export const setFetchProductDetailsStart = (productId) => ({
  type: PRODUCT_ACTION_TYPES.FETCH_PRODUCT_DETAILS_START,
  payload: productId,
});

export const setFetchProductsFailed = (error) => ({
  type: PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_FAILED,
  payload: error,
});

export const setFetchProductDetailsFailed = (error) => ({
  type: PRODUCT_ACTION_TYPES.FETCH_PRODUCT_DETAILS_FAILED,
  payload: error,
});

export const setFetchProductsSuccess = (products) => ({
  type: PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const setFetchProductDetailsSuccess = (product) => ({
  type: PRODUCT_ACTION_TYPES.FETCH_PRODUCT_DETAILS_SUCCESS,
  payload: product,
});

export const fetchProductsList = async (categoryId, currentPage) => {
  try {
    const response = await api.get("/products/list", {
      params: {
        country: "us",
        lang: "en",
        currentpage: currentPage,
        pagesize: "30",
        categories: categoryId,
      },
    });

    return response.data;
  } catch (error) {
    console.log("error from products list", error);
  }
};

export const fetchProductDetails = async (productId) => {
  try {
    const response = await api.get(`/products/detail`, {
      params: {
        lang: "en",
        country: "us",
        productcode: productId,
      },
    });
    return response.data.product;
  } catch (error) {
    console.log("error from product details", error);
  }
};
