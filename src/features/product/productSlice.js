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
  },
});

export const { 
  addProductRequest,
  addProductSuccess, 
  addProductFailure,
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFailure,
  } = productSlice.actions;

export default productSlice.reducer;
