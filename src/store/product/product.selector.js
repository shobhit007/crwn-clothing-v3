import { createSelector } from "reselect";

const selectProductReducer = (state) => state.productReducer;

export const selectProductsList = createSelector(
  [selectProductReducer],
  (product) => product.products
);

export const selectProductDetails = createSelector(
  [selectProductReducer],
  (product) => product.productDetail
);
