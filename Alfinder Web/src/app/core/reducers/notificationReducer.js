// import {
//     AUTH_ERROR,
//     AUTH_LOGIN_FAIL,
//     AUTH_REGISTER_FAIL,
//     ADD_TO_CART_FAIL,
//     REMOVE_FROM_CART_FAIL,
//     UPDATE_CART_FAIL,
//     CLEAR_CART_FAIL,
//     ADD_TO_WISHLIST_FAIL,
//     REMOVE_FROM_WISHLIST_FAIL,
//     CLEAR_WISHLIST_FAIL,
//     ORDER_PALCE_FAIL,
//     ORDER_RETURN_FAIL,
//     QUICK_BUY_FAIL,
//     GET_PRODUCT_FAIL,
//     GET_RELATED_PRODUCTS_FAIL,
//     GET_PRODUCT_SUGGESTIONS_FAIL,
// } from '../actions/types';

// const initialState = {
//     code: null,
//     message: null,
// };

// export default function(state = initialState, action) {
//     switch (action.type) {
//         // case AUTH_ERROR:
//         case AUTH_LOGIN_FAIL:
//         case AUTH_REGISTER_FAIL:
//         case ADD_TO_CART_FAIL:
//         case REMOVE_FROM_CART_FAIL:
//         case UPDATE_CART_FAIL:
//         case CLEAR_CART_FAIL:
//         case ADD_TO_WISHLIST_FAIL:
//         case REMOVE_FROM_WISHLIST_FAIL:
//         case CLEAR_WISHLIST_FAIL:
//         case ORDER_PALCE_FAIL:
//         case ORDER_RETURN_FAIL:
//         case QUICK_BUY_FAIL:
//         case GET_PRODUCT_FAIL:
//         case GET_RELATED_PRODUCTS_FAIL:
//         case GET_PRODUCT_SUGGESTIONS_FAIL:
//             return {
//                 // code: action.payload.code,
//                 message: action.payload.message,
//             };
//         default:
//             return state;
//     }
// }