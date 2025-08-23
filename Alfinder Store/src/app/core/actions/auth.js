import axios from 'axios';
import { AUTH_LOADING, AUTH_LOADED, AUTH_ERROR, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL, AUTH_LOGOUT_SUCCESS, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAIL } from "./types";


// CHECK TOKEN AND LOAD AUTH STATE
export const authLoad = () => (dispatch, getState) => {
    dispatch({type: AUTH_LOADING});

    // test
    if (getState().authReducer.token) {
        dispatch({type: AUTH_LOADED});
    } else {
        dispatch({type: AUTH_ERROR});
    }

    // axios.post('check', null, tokenConfig(getState))
    //     .then(res => {
    //         dispatch({
    //             type: AUTH_LOADED,
    //             type: AUTH_ERROR,
    //             payload: res.data,
    //         });
    //     }).catch(err => {
    //         dispatch({type: AUTH_ERROR});
    //         console.log(err)
    //     })
};

// LOGIN
export const authLogin = (email, password) => dispatch => {
    dispatch({type: AUTH_LOADING});
    
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});

    axios.post('https://alfinder.com/alfinder/public/api/auth/login', body, config)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: res.data.data.code === 7 ? AUTH_LOGIN_SUCCESS : AUTH_LOGIN_FAIL,
                payload: res.data,
            });
        }).catch(err => {
            dispatch({
                type: AUTH_LOGIN_FAIL,
                payload: err
            });
            console.log(err)
        })
};

// REGISTER
export const authRegister = ({fname, lname, email, phone, password, password_confirmation}) => dispatch => {

    if (password !== password_confirmation) {
        dispatch({
            type: AUTH_REGISTER_FAIL,
            payload: {
                message: 'passwords much match.'
            }
        });
    }
    
    axios.post('https://alfinder.com/alfinder/public/api/user/register', {
        first_name: fname,
        last_name: lname,
        email: email,
        phone_number: phone,
        password: password
    })
    .then(res => {
        console.log(res);
        dispatch({type: AUTH_REGISTER_SUCCESS});
        dispatch(authLogin(email, password));
    })
    .catch(err => {
        dispatch({type: AUTH_REGISTER_FAIL, payload: err});
        console.log(err);
    });
};

// LOGOUT
export const authLogout = () => (dispatch, getState) => {
    const token = getState().authReducer.token;
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authentication'] = `Token ${token}`;
    }

    // axios.post('logout', null, tokenConfig(getState))
    //     .then(res => {
            dispatch({
                type: AUTH_LOGOUT_SUCCESS,
            });
        // }).catch(err => {
        //     dispatch({type: AUTH_ERROR, payload: err});
        //     console.log(err)
        // })
};

// RESET PASSWORD
export const resetPassword = () => (dispatch, getState) => {};

// HELPER
export const tokenConfig = getState => {
    const token = getState().authReducer.token;
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
};
