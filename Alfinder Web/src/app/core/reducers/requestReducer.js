import { 
	GET_ANALYSIS,
	SUBMIT_REQUEST,
	GET_PENDING_REQUESTS,
    GET_COMPLETE_REQUESTS,
} from '../actions/types'


const initialState = {}


export default function(state = initialState, action) {
    switch(action.type) {
        case SUBMIT_REQUEST:
            return {
                ...state,
                success: action.payload,
            }
        case GET_PENDING_REQUESTS:
            return {
                ...state,
                requests: action.payload.pending_requests,
            }
        case GET_COMPLETE_REQUESTS:
            return {
                ...state,
                requests: action.payload.complete_requests,
            }
        case GET_ANALYSIS:
            return {
                ...state,
                request: action.payload.request,
                analysis: action.payload.analysis,
            }
        default:
            return state
    }
}
