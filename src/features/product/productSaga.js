import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../utils/axios";
import {
  addProductFailure,
  addProductRequest,
  addProductSuccess,
  changeProductStatusFailure,
  changeProductStatusRequest,
  changeProductStatusSuccess,
  deleteProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  editProductImagesFailure,
  editProductImagesRequest,
  editProductImagesSuccess,
  getAllProductsFailure,
  getAllProductsRequest,
  getAllProductsSuccess,
  updateProductFailure,
  updateProductRequest,
  updateProductSuccess,
} from "./productSlice";

//Add Product API
function addProductAPI(payload, config) {
  return axios.post("/private/add-product", payload, {
    ...config,
    withCredentials: true,
  });
}

function* handleAddProduct(action) {
  try {
    const token = localStorage.getItem("admin_token");
    const response = yield call(addProductAPI, action.payload, {
      headers: {
        "x-auth-token": token,
      },
    });
    yield put(addProductSuccess(response.data));
  } catch (error) {
    yield put(
      addProductFailure(error.response?.data?.message || "Error adding product")
    );
  }
}

//Update Product
function updateProductAPI(payload, config) {
  return axios.post("/private/update-product", payload, {
    ...config,
    withCredentials: true,
  });
}

function* handleUpdateProduct(action) {
  try {
    const token = localStorage.getItem("admin_token");

    const response = yield call(updateProductAPI, action.payload, {
      headers: {
        "x-auth-token": token,
      },
    });

    yield put(updateProductSuccess(response.data));
  } catch (error) {
    yield put(
      updateProductFailure(
        error.response?.data?.message || "Error updating product"
      )
    );
  }
}

//Change Product Status
function changeProductStatusAPI(payload, config) {
  return axios.post("/private/change-product-status", payload, {
    ...config,
    withCredentials: true,
  });
}

function* handleChangeProductStatus(action) {
  try {
    const token = localStorage.getItem("admin_token");
    const response = yield call(changeProductStatusAPI, action.payload, {
      headers: { "x-auth-token": token },
    });
    yield put(changeProductStatusSuccess(response.data));
  } catch (error) {
    yield put(
      changeProductStatusFailure(
        error.response?.data?.message || "Error changing product status"
      )
    );
  }
}

// Edit Product Images API
function editProductImagesAPI(payload, productId, config) {
  return axios.post(
    `/private/update-product-images?productId=${productId}`,
    payload,
    {
      ...config,
      withCredentials: true,
    }
  );
}

function* handleEditProductImages(action) {
  try {
    const token = localStorage.getItem("admin_token");
    const { productId, formData } = action.payload;

    const response = yield call(editProductImagesAPI, formData, productId, {
      headers: {
        "x-auth-token": token,
      },
    });

    yield put(editProductImagesSuccess(response.data));
  } catch (error) {
    yield put(
      editProductImagesFailure(
        error.response?.data?.message || "Error editing product images"
      )
    );
  }
}

//Delete Product
function deleteProductAPI(payload, config) {
  return axios.post("/private/delete-product", payload, {
    ...config,
    withCredentials: true,
  });
}

function* handleDeleteProduct(action) {
  try {
    const token = localStorage.getItem("admin_token");
    const response = yield call(deleteProductAPI, action.payload, {
      headers: {
        "x-auth-token": token,
      },
    });
    yield put(deleteProductSuccess(response.data));
  } catch (error) {
    yield put(
      deleteProductFailure(
        error.response?.data?.message || "Error deleting product"
      )
    );
  }
}

//Get All Products
function getAllProductsAPI(params, config) {
  return axios.get("private/get-products", {
    params,
    ...config,
    withCredentials: true,
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
      getAllProductsFailure(
        error.response?.data?.message || "Error fetching products"
      )
    );
  }
}

export function* watchProductSagas() {
  yield takeLatest(addProductRequest.type, handleAddProduct);
  yield takeLatest(getAllProductsRequest.type, handleGetAllProducts);
  yield takeLatest(updateProductRequest.type, handleUpdateProduct);
  yield takeLatest(changeProductStatusRequest.type, handleChangeProductStatus);
  yield takeLatest(deleteProductRequest.type, handleDeleteProduct);
  yield takeLatest(editProductImagesRequest.type, handleEditProductImages);
}
