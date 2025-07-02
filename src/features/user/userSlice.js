import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userStats",
  initialState: {
    loading: false,
    data: null,
    success: false,
    error: null,
  },
  reducers: {
    //GET USER STATS
    getUserStatsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserStatsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getUserStatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  addProductRequest,
  addProductSuccess, 
  addProductFailure,
  getUserStatsRequest,
  getUserStatsSuccess,
  getUserStatsFailure,
  } = userSlice.actions;

export default userSlice.reducer;
