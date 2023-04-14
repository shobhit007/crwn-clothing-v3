import { all, call } from "redux-saga/effects";

import { productSaga } from "./product/product.saga";
import { userSagas } from "./user/user.saga";

export function* rootSaga() {
  yield all([call(productSaga), call(userSagas)]);
}
