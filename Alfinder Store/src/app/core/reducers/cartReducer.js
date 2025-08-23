import {GET_CART, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL} from '../actions/types.js';

const initialState = {
    products: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                ...action.payload,
                products: action.payload.products,
            };
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                cart: action.payload,
            }
        default:
            return state;
    }
}