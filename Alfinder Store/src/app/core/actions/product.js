import axios from 'axios';
import {
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_RELATED_PRODUCTS_SUCCESS,
    GET_RELATED_PRODUCTS_FAIL,
    GET_PRODUCT_SUGGESTIONS_SUCCESS,
    GET_PRODUCT_SUGGESTIONS_FAIL,
} from '../actions/types';


// GET PRODUCT
export const getProduct = id => dispatch => {
    axios.post('https://alfinder.com/alfinder/public/api/products/get', {
        product_id: id
    })
        .then(res => {
            dispatch({
                type: GET_PRODUCT_SUCCESS,
                payload: res.data.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_PRODUCT_FAIL,
                payload: err
            });
            console.log(err);
        });
};


// GET SUGGESTED PRODUCT
export const getProductSuggestions = (id, category) => dispatch => {
    axios.post('https://alfinder.com/alfinder/public/api/products/suggestions', {
            product_id: id,
            category: category,
        })
        .then(res => {
            dispatch({
                type: GET_PRODUCT_SUGGESTIONS_SUCCESS,
                payload: res.data.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_PRODUCT_SUGGESTIONS_FAIL,
                payload: err
            });
            console.log(err);
        });
};


// GET RELATED PRODUCT
export const getRelatedProducts = (id, category) => dispatch => {
    axios.post('https://alfinder.com/alfinder/public/api/products/related', {
            product_id: id,
            category: category,
        })
        .then(res => {
            dispatch({
                type: GET_RELATED_PRODUCTS_SUCCESS,
                payload: res.data.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_RELATED_PRODUCTS_FAIL,
                payload: err
            });
            console.log(err);
        });
};

// GET PRODUCT RATING
