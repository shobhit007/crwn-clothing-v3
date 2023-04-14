import { createStore, compose, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleWare from "@redux-saga/core";

import { rootReducer } from "./rootReducer";

import { rootSaga } from "./rootSaga";

const sagaMiddleWare = createSagaMiddleWare();

const middlewares = [logger, sagaMiddleWare];

const config = {
  key: "root",
  storage,
  whitelist: ["cartReducer"],
};

const persistedReducer = persistReducer(config, rootReducer);

const composeEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
