import { all } from "redux-saga/effects";
import { watchAdminLogin } from "../features/auth/authSaga";
import { watchProductSagas } from "../features/product/productSaga";
import { watchUserStatsSagas } from "../features/user/userSaga";

export default function* rootSaga(){
    yield all([
        watchAdminLogin(),
        watchProductSagas(),
        watchUserStatsSagas(),
    ]);
}