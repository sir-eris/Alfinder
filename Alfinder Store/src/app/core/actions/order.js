import axios from 'axios';
import { tokenConfig } from './auth'
import {
  GET_ORDERS,
  GET_ORDER_PRODUCTS,
  ORDER_PALCE_SUCCESS,
  ORDER_PALCE_FAIL,
  ORDER_RETURN_SUCCESS,
  ORDER_RETURN_FAIL,
  QUICK_BUY_SUCCESS,
  QUICK_BUY_FAIL,
} from "./types";


// GET ORDERS
export const getOrders = () => (dispatch, getState) => { // shipping and billing info
    axios.post('', null, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_ORDERS,
            payload: res.data,
        })
    }).catch(err => console.log(err))
};

// GET ORDER PRODUCTS
export const getOrderProducts = orderId => (dispatch, getState) => {
    const body = JSON.stringify({orderId});

    axios.post('', body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_ORDER_PRODUCTS,
            payload: res.data,
        })
    }).catch(err => console.log(err))
};

// PLACE ORDER
export const placeOrder = () => (dispatch, getState) => {
    axios.post('', null, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: ORDER_PALCE_SUCCESS,
            payload: res.data,
        })
    }).catch(err => {
        dispatch({
            type: ORDER_PALCE_FAIL,
            payload: err
        });
        console.log(err);
    })
};

// QUICK BUY
export const quickBuy = (id, count) => (dispatch, getState) => {
    const body = JSON.stringify({product_id: id, count});

    axios.post('', body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: QUICK_BUY_SUCCESS,
            payload: res.data,
        })
    }).catch(err => {
        dispatch({
            type: QUICK_BUY_FAIL,
            payload: err
        });
        console.log(err);
    })
};

// RETURN
