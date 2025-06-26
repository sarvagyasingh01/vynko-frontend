import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice'
import rootSaga from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer:{
        auth:authReducer,
        products: productReducer,
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({thunk:false}).concat(sagaMiddleware),
});


sagaMiddleware.run(rootSaga);