import {
	GET_INFO,
	GET_ADMIN,
	GET_BILLING,
	UPDATE_INFO_SECCESS,
	UPDATE_ADMIN_SECCESS,
	UPDATE_BILLING_SECCESS,
	UPDATE_FAIL,
 } from "../actions/types"


 const initialState = {
    success: false,
 }


export default function(state = initialState, action) {
    switch(action.type) {
        case GET_INFO:
            return {
                ...state,
                settings: action.payload,
            }
        case UPDATE_INFO_SECCESS:
            return {
                ...state,
                success: action.payload,
            }
        case UPDATE_ADMIN_SECCESS:
            return {
                ...state,
                success: action.payload,
            }
        case UPDATE_BILLING_SECCESS:
            return {
                ...state,
                success: action.payload,
            }
        case UPDATE_FAIL:
        default:
            return state
    }
}
