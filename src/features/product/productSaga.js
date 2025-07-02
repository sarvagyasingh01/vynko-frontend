import { call, put, takeLatest } from "redux-saga/effects";
import axios from '../../utils/axios';
import { addProductFailure, addProductRequest, addProductSuccess, getAllProductsFailure, getAllProductsRequest, getAllProductsSuccess } from "./productSlice";

//Add Product API
function addProductAPI(payload, config){
    return axios.post("/private/add-product", payload, config, {withCredentials:true});

}

function* handleAddProduct(action) {
  try {
    const token = localStorage.getItem("admin_token")
    const response = yield call(addProductAPI,action.payload,{
        headers: {
            "x-auth-token": token,
        },
    });
    yield put(addProductSuccess(response.data));
  } catch (error) {
    yield put(addProductFailure(error.response?.data?.message || "Error adding product"));
  }
}

//Get All Products
function getAllProductsAPI(params, config) {
  return axios.get("private/get-products", {
    params,
    ...config,
    withCredentials: true
  });
}


function* handleGetAllProducts(action) {
  try {
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    const response = yield call(getAllProductsAPI, action.payload, config);
    yield put(getAllProductsSuccess(response.data.data));
  } catch (error) {
    yield put(
      getAllProductsFailure(error.response?.data?.message || "Error fetching products")
    );
  }
}


export function* wathchProductSagas() {
  yield takeLatest(addProductRequest.type, handleAddProduct);
  yield takeLatest(getAllProductsRequest.type, handleGetAllProducts);
}
