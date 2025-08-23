import {
    GET_WISHLIST_SUCCESS,
    ADD_TO_WISHLIST_SUCCESS,
    ADD_TO_WISHLIST_FAIL,
    REMOVE_FROM_WISHLIST_SUCCESS,
    REMOVE_FROM_WISHLIST_FAIL,
    CLEAR_WISHLIST_SUCCESS,
    CLEAR_WISHLIST_FAIL,
} from '../actions/types';

const initialState = {
    products: [],
};


export default function (state = initialState, action) {
    switch(action.type) {
        case GET_WISHLIST_SUCCESS:
            return {
                ...state,
                ...action.payload,
                products: action.payload.products,
            }
        default:
            return state;
    }
}