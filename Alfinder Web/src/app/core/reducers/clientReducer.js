import { GET_CLIENTS, CREATE_CLIENT } from "../actions/types"



const initialState = {}


export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CLIENTS:
            return {
                ...state,
                clients: action.payload,
            }
        case CREATE_CLIENT:
            return {
                ...state,
                success: action.payload,
            }
        default:
            return state
    }
}
