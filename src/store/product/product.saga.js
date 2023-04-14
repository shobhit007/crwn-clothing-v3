import { all, call, put, takeLatest } from "redux-saga/effects";

import { PRODUCT_ACTION_TYPES } from "./product.types";

import {
  setFetchProductsFailed,
  setFetchProductsSuccess,
  setFetchProductDetailsSuccess,
  setFetchProductDetailsFailed,
  fetchProductsList,
  fetchProductDetails,
} from "./product.action";

function* fetchProducts(action) {
  const {
    payload: { categoryId, currentPage },
  } = action;
  try {
    const productsData = yield call(fetchProductsList, categoryId, currentPage);

    yield put(setFetchProductsSuccess(productsData));
  } catch (error) {
    yield put(setFetchProductsFailed(error));
  }
}

function* fetchProduct({ payload }) {
  try {
    const product = yield call(fetchProductDetails, payload);
    yield put(setFetchProductDetailsSuccess(product));
  } catch (error) {
    yield put(setFetchProductDetailsFailed(error));
  }
}

function* fetchProductListStart() {
  yield takeLatest(PRODUCT_ACTION_TYPES.FETCH_PRODUCTS_START, fetchProducts);
}

function* fetchProductDetailsStart() {
  yield takeLatest(
    PRODUCT_ACTION_TYPES.FETCH_PRODUCT_DETAILS_START,
    fetchProduct
  );
}

export function* productSaga() {
  yield all([call(fetchProductListStart), call(fetchProductDetailsStart)]);
}
