import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../utils/axios';
import { adminLoginRequest, adminLoginSuccess, adminLoginFailure } from './authSlice';

function loginAPI(payload){
    return axios.post('/admin-login',payload,{withCredentials:true});
}

function* handleAdminLogin(action){
    try{
        const response = yield call(loginAPI,action.payload);
        yield put(adminLoginSuccess(response.data));
        window.location.reload()
    }
    catch(error){
        const message = error.response?.data?.message || 'Login Failed';
        yield put(adminLoginFailure(message));
    }
}


export function* watchAdminLogin(){
    yield takeLatest(adminLoginRequest.type, handleAdminLogin);
}