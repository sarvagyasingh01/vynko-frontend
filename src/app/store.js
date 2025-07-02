import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice'
import userStatsReducer from '../features/user/userSlice'
import rootSaga from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer:{
        auth:authReducer,
        products: productReducer,
        userStats: userStatsReducer
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware({thunk:false}).concat(sagaMiddleware),
});


sagaMiddleware.run(rootSaga);