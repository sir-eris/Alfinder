// import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REGISTER, AUTH_RESET_PASSWORD } from "./types";
                // type: AUTH_ERROR,
import {
    AUTH_LOADING,
    AUTH_LOADED,
    AUTH_ERROR,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAIL,
    AUTH_LOGOUT_SUCCESS,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAIL
 } from "../actions/types";

const initialState = {
    isLoading: false,
    isAuthenticated: null,
    token: localStorage.getItem('token'),
    // user: null,
};

export default function(state = initialState, action) {
    switch(action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case AUTH_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
            }
        case AUTH_LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.data.access_token);
            return {
                ...state,
                // ...action.payload,
                isLoading: false,
                isAuthenticated: true,
                token: action.payload.data.access_token,
            }
        case AUTH_ERROR:
        case AUTH_LOGIN_FAIL:
        case AUTH_REGISTER_FAIL:
        case AUTH_LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isLoading: false,
                isAuthenticated: false,
            }
        default:
            return state;
    }
}
