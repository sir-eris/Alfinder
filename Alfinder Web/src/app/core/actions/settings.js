import axios from 'axios'
import { tokenConfig } from './auth'
import {
	GET_INFO,
	GET_ADMIN,
	GET_BILLING,
	UPDATE_INFO_SECCESS,
	UPDATE_ADMIN_SECCESS,
	UPDATE_BILLING_SECCESS,
	UPDATE_FAIL,
} from './types'


// GETS ALL
export const getInfo = () => (dispatch, getState) => {
    axios.post('https://api.alfinder.com/settings/info', null, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_INFO,
            payload: res.data,
        })
    }).catch()
};

export const updateInfo = (phone, url, size, years, focus, address, industry) => (dispatch, getState) => {
	const body = JSON.stringify({phone, url, size, years, focus, address, industry})
	
    axios.post('https://api.alfinder.com/settings/info/update', body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: UPDATE_INFO_SECCESS,
            payload: res.data,
        })
    }).catch(err => dispatch({type: UPDATE_FAIL}))
};


export const updateAdmin = (role, phone) => (dispatch, getState) => {
	const body = JSON.stringify({role, phone})

    axios.post('https://api.alfinder.com/settings/admins/update', body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: UPDATE_ADMIN_SECCESS,
            payload: res.data,
        })
    }).catch(err => dispatch({type: UPDATE_FAIL}))
};


export const updateBilling = (billing_plan, billing_acc_type, billing_acc_number, billing_rt_number, billing_bank, billing_zipcode, billing_acc_name) => (dispatch, getState) => {
    const body = JSON.stringify({billing_plan, billing_acc_type, billing_acc_number, billing_rt_number, billing_bank, billing_zipcode, billing_acc_name})

    axios.post('https://api.alfinder.com/settings/billing/update', body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: UPDATE_BILLING_SECCESS,
            payload: res.data,
        })
    }).catch(err => dispatch({type: UPDATE_FAIL}))
};
