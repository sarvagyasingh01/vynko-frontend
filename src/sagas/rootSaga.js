import { all } from "redux-saga/effects";
import { watchAdminLogin } from "../features/auth/authSaga";
import { wathchProductSagas } from "../features/product/productSaga";

export default function* rootSaga(){
    yield all([
        watchAdminLogin(),
        wathchProductSagas()
    ]);
}