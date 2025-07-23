import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
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
      state.success = false;
      state.error = null;
    },
    updateProductSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    updateProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //UPDATE PRODUCT STATUS
    changeProductStatusRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    changeProductStatusSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    changeProductStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
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
  changeProductStatusRequest,
  changeProductStatusSuccess,
  changeProductStatusFailure,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;
