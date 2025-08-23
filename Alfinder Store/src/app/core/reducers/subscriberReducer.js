import {
    SUBSCRIBED_SUCCESS,
    UNSUBSCRIBED_SUCCESS,
} from '../actions/types';

const initialState = {};


export default function (state = initialState, action) {
    switch(action.type) {
        case SUBSCRIBED_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        case UNSUBSCRIBED_SUCCESS:
            console.log(action.payload.message);
            return;
        default:
            return state;
    }
}