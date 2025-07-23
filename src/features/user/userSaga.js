import { call, put, takeLatest } from "redux-saga/effects";
import axios from '../../utils/axios';
import { getUserStatsFailure, getUserStatsRequest, getUserStatsSuccess } from "./userSlice";

//Get User Stats
function getUserStatsAPI(config) {
  return axios.get("private/get-user-stats", {
    // params,
    ...config,
    withCredentials: true
  });
}


function* handleGetUserStats(action) {
  try {
    const token = localStorage.getItem("admin_token");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    const response = yield call(getUserStatsAPI,
        // action.payload,
        config);
    yield put(getUserStatsSuccess(response.data));
  } catch (error) {
    yield put(
      getUserStatsFailure(error.response?.data?.message || "Error fetching user stats")
    );
  }
}


export function* watchUserStatsSagas() {
  yield takeLatest(getUserStatsRequest.type, handleGetUserStats);
}