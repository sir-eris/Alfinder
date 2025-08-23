import {
    AUTH_LOADING,
    AUTH_LOADED,
    AUTH_ERROR,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAIL,
    AUTH_LOGOUT_SUCCESS,
    AUTH_TEMP_PASS_SUCESS,
    AUTH_TEMP_PASS_FAIL,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAIL,
    // PASSWORD_RESET_SUCCESS,
    // PASSWORD_RESET_FAIL,
 } from "../actions/types"

const initialState = {
    status: null,
    username: null,
    tempPass: null,
    tempPassFail: false,
    isLoading: false,
    success: null,
    isAuthenticated: null,
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
}

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
                tempPass: null,
                status: action.payload.status,
                username: action.payload.username,
            }
        case AUTH_TEMP_PASS_SUCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                tempPass: action.payload.temp_pass,
                tempPassFail: false,
            }
        case AUTH_TEMP_PASS_FAIL:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                tempPassFail: true,
            }
        case AUTH_LOGIN_SUCCESS:
            localStorage.setItem('access', action.payload.access_token)
            localStorage.setItem('refresh', action.payload.refresh_token)
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                tempPass: null,
                success: true,
                username: action.payload.username,
                access: action.payload.access_token,
                refresh: action.payload.refresh_token,
        }
        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                registerSuccess: action.payload,
            }
        case AUTH_ERROR:
        case AUTH_LOGIN_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                isLoading: false,
                username: null,
                tempPass: null,
                isAuthenticated: false,
                success: action.success,
                loginError: action.payload,
            }
        case AUTH_REGISTER_FAIL:
        case AUTH_LOGOUT_SUCCESS:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                access: null,
                refresh: null,
                username: null,
                tempPass: null,
                isLoading: false,
                isAuthenticated: false,
            }
        default:
            return state;
    }
}
