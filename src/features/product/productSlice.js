import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    // ADD PRODUCT
    addProductSuccess: false,
    addProductError: null,

    // UPDATE PRODUCT
    updateProductSuccess: false,
    updateProductError: null,

    // EDIT PRODUCT IMAGES
    editProductImagesSuccess: false,
    editProductImagesError: null,

    // CHANGE STATUS
    changeStatusSuccess: false,
    changeStatusError: null,

    //DELETE PRODUCT
    deleteProductSuccess: false,
    deleteProductError: null,

    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    //ADD PRODUCT
    addProductRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    addProductSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    addProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //GET ALL PRODUCTS
    getAllProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.docs;
      state.totalCount = action.payload.totalCount || 0;
    },
    getAllProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // UPDATE PRODUCT
    updateProductRequest: (state) => {
      state.loading = true;
      state.updateProductSuccess = false;
      state.updateProductError = null;
    },
    updateProductSuccess: (state) => {
      state.loading = false;
      state.updateProductSuccess = true;
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.updateProductError = action.payload;
    },

    // EDIT PRODUCT IMAGES
    editProductImagesRequest: (state) => {
      state.loading = true;
      state.editProductImagesSuccess = false;
      state.editProductImagesError = null;
    },
    editProductImagesSuccess: (state) => {
      state.loading = false;
      state.editProductImagesSuccess = true;
    },
    editProductImagesFailure: (state, action) => {
      state.loading = false;
      state.editProductImagesError = action.payload;
    },

    //UPDATE PRODUCT STATUS
    changeProductStatusRequest: (state) => {
      state.loading = true;
      state.changeStatusError = null;
      state.changeStatusSuccess = false;
    },
    changeProductStatusSuccess: (state, action) => {
      state.loading = false;
      state.changeStatusSuccess = true;
    },
    changeProductStatusFailure: (state, action) => {
      state.loading = false;
      state.changeStatusError = action.payload;
      state.changeStatusSuccess = false;
    },

    //DELET PRODUCT
    deleteProductRequest: (state) => {
      state.loading = true;
      state.deleteProductError = null;
      state.deleteProductSuccess = false;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.deleteProductSuccess = true;
    },
    deleteProductFailure: (state, action) => {
      state.loading = false;
      state.deleteProductError = action.payload;
      state.deleteProductSuccess = false;
    },

    //RESET STATE
    resetProductState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  addProductRequest,
  addProductSuccess,
  addProductFailure,
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  editProductImagesRequest,
  editProductImagesSuccess,
  editProductImagesFailure,
  changeProductStatusRequest,
  changeProductStatusSuccess,
  changeProductStatusFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;
