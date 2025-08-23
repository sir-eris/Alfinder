import {
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_RELATED_PRODUCTS_SUCCESS,
    GET_RELATED_PRODUCTS_FAIL,
    GET_PRODUCT_SUGGESTIONS_SUCCESS,
    GET_PRODUCT_SUGGESTIONS_FAIL,    
} from '../actions/types.js';

const initialState = {
    relatedProducts: [],
    productSuggestions: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case GET_RELATED_PRODUCTS_SUCCESS:
            return {
                ...state,
                relatedProducts: action.payload,
            }
        case GET_PRODUCT_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                productSuggestions: action.payload,
            }
        case GET_PRODUCT_FAIL:
            return state;
        default:
            return state;
    }
}
