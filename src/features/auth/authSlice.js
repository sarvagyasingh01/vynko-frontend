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
      const { token, ...user } = action.payload.data;
      state.user = user;
      state.token = token;
      localStorage.setItem('admin_token', token);
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
