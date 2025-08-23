import axios from 'axios'
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
} from "./types"


// CHECK TOKEN AND LOAD AUTH STATE
export const authLoad = () => (dispatch, getState) => {
    dispatch({type: AUTH_LOADING});

    let access_token = localStorage.getItem('access')
    let refresh_token = localStorage.getItem('refresh')

    // const body = JSON.stringify({refresh_token})

    if (access_token && refresh_token) {
        axios.post('https://api.alfinder.com/auth/verify', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: res.data.success ? AUTH_LOADED : AUTH_ERROR,
                payload: res.data,
            });
        }).catch(err => {
            dispatch({type: AUTH_ERROR})
        })
    } else {
        dispatch({type: AUTH_ERROR})
    }
}


// LOGIN
export const authTempPass = (email) => dispatch => {
    dispatch({type: AUTH_LOADING})

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email})

    axios.post('https://api.alfinder.com/auth/login/request', body, config)
        .then(res => {
            dispatch({
                type: res.data === false ? AUTH_TEMP_PASS_FAIL : AUTH_TEMP_PASS_SUCESS,
                payload: res.data,
            });
        }).catch(err => {
            dispatch({type: AUTH_ERROR, payload: err})
            // console.log(err)
        })
}

export const authLogin = (email, password) => dispatch => {
    dispatch({type: AUTH_LOADING})
    
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password})

    axios.post('https://api.alfinder.com/auth/login', body, config)
    .then(res => {
        dispatch({
            type: res.data === false ? AUTH_LOGIN_FAIL : AUTH_LOGIN_SUCCESS,
            payload: res.data,
            success: res.data === false ? false : true,
        })
    }).catch(err => {
            dispatch({
                type: AUTH_LOGIN_FAIL,
            });
        })
}

// LOGOUT
export const authLogout = () => (dispatch, getState) => {
    // axios.post('https://api.alfinder.com/auth/logout', null, tokenConfig(getState))
    //     .then(res => {
            dispatch({
                type: AUTH_LOGOUT_SUCCESS,
            });
        // }).catch(err => {
        //     dispatch({type: AUTH_ERROR});
        // })
}



// REGISTER
export const authRegister = (fname, lname, email, phone, role, company) => dispatch => {
    dispatch({type: AUTH_LOADING})

    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({fname, lname, email, phone, role, company})

    axios.post('https://api.alfinder.com/auth/register', body, config)
    .then(res => {
        dispatch({type: res.data === true ? AUTH_REGISTER_SUCCESS : AUTH_REGISTER_FAIL, payload: res.data});
    })
    .catch(err => {
        console.log(err)
        dispatch({type: AUTH_REGISTER_FAIL, payload: err});
    });
};


// HELPERS
export const tokenConfig = getState => {
    const access_token = getState().authReducer.access;
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }
    if (access_token) {
        config.headers["Authorization"] = `Bearer ${access_token}`;
    }

    return config;
}
