import axios from 'axios';
import { tokenConfig } from './auth';
import {
    GET_WISHLIST_SUCCESS,
    ADD_TO_WISHLIST_SUCCESS,
    ADD_TO_WISHLIST_FAIL,
    REMOVE_FROM_WISHLIST_SUCCESS,
    REMOVE_FROM_WISHLIST_FAIL,
    CLEAR_WISHLIST_SUCCESS,
    CLEAR_WISHLIST_FAIL,
} from './types';


// GET WISHLIST
export const getWishlist = () => (dispatch, getState) => {
    axios.post('', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_WISHLIST_SUCCESS,
            payload: res.data,
        }).catch(err => {
            console.log(err);
        });
    });
};

// ADD TO WISHLIST
export const addToWishlist = id => (dispatch, getState) => {
    axios.post('', {product_id: id}, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: ADD_TO_WISHLIST_SUCCESS,
            payload: res.data,
        }).catch(err => {
// REMOVE FROM WISHLIST
dispatch({
    type: ADD_TO_WISHLIST_FAIL,
});
            console.log(err);
        });
    });
};

// REMOVE FROM WISHLIST
export const removeFromWishlist = id => (dispatch, getState) => {
    axios.post('', {product_id: id}, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: REMOVE_FROM_WISHLIST_SUCCESS,
            payload: res.data,
        }).catch(err => {
// REMOVE FROM WISHLIST
dispatch({
    type: REMOVE_FROM_WISHLIST_FAIL,
});
            console.log(err);
        });
    });
};

// CLEAR WISHLIST
export const clearWishlist = () => (dispatch, getState) => {
    axios.post('', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: CLEAR_WISHLIST_SUCCESS,
            payload: res.data,
        }).catch(err => {
// REMOVE FROM WISHLIST
dispatch({
    type: CLEAR_WISHLIST_FAIL,
});
            console.log(err);
        });
    });
};
