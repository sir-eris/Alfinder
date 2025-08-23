import axios from 'axios';
import { tokenConfig } from './auth'
import {
  GET_CART,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAIL,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAIL,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAIL,
} from "./types";

// GET CART
export const getCart = () => (dispatch, getState) => {
    axios.post('https://alfinder.com/alfinder/public/api/user/cart/get', tokenConfig(getState))
    .then(res => {
        console.log(res);
        dispatch({
            type: GET_CART,
            payload: res.data,
        })
    }).catch(err => console.log(err))
};

// ADD TO CART
export const addToCart = id => (dispatch, getState) => {
    axios.post('https://alfinder.com/alfinder/public/api/user/cart/add', {
        product_id: id,
        count: 1
    }, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: res.data,
        })
    }).catch(err => {
        dispatch({
            type: ADD_TO_CART_FAIL,
            payload: err
        });
        console.log(err);
    })
};

//REMOVE FROM CART
export const removeFromCart = id => (dispatch, getState) => {
    axios.delete('', {
        product_id: id,
    }, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: REMOVE_FROM_CART_SUCCESS,
            payload: id,
        })
    }).catch(err => {
        dispatch({
            type: REMOVE_FROM_CART_FAIL,
            payload: err
        });
        console.log(err);
    })
};

// UPDATE CART
export const updateCart = () => (dispatch, getState) => {
    axios.post('', {})
    .then(res => {
        dispatch({
            type: UPDATE_CART_SUCCESS,
            payload: res.data,
        })
    }).catch(err => {
        dispatch({type: UPDATE_CART_FAIL});
        console.log(err);
    })
};

// CLEAR CART
export const clearCart = () => (dispatch, getState) => {
    axios.post('', {})
    .then(res => {
        dispatch({
            type: CLEAR_CART_SUCCESS,
            payload: null,
        })
    }).catch(err => {
        dispatch({type: CLEAR_CART_FAIL});
        console.log(err);
    })
};