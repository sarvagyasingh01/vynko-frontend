import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    token: localStorage.getItem('admin_token')||null,
    error: null,
  },
  reducers: {
    adminLoginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    adminLoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.data.token;
      localStorage.setItem('admin_token',action.payload.data.token);
    },
    adminLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('admin_token');
    },
  },
});

export const {
  adminLoginRequest,
  adminLoginSuccess,
  adminLoginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
