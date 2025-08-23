import {
    GET_ORDERS,
    GET_ORDER_PRODUCTS,
    ORDER_PALCE_SUCCESS,
    ORDER_PALCE_FAIL,
    QUICK_BUY_SUCCESS,
    QUICK_BUY_FAIL,
} from '../actions/types.js';

const initialState = {
    orders: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
            };
        case GET_ORDER_PRODUCTS:
            return {
                ...state,
                ...action.payload,
            }
        case ORDER_PALCE_SUCCESS:
            return {
                ...state,
            }
        case QUICK_BUY_SUCCESS:
            return {
                ...state,
            }
        case ORDER_PALCE_FAIL:
        case QUICK_BUY_FAIL:
            return state;
        default:
            return state;
    }
}
