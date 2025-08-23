import { SUBMIT_DEMO } from "../actions/types"



const initialState = {
    success: false,
}


export default function(state = initialState, action) {
    switch(action.type) {
        case SUBMIT_DEMO:
            return {
                ...state,
                success: action.payload,
            }
        default:
            return state
    }
}
