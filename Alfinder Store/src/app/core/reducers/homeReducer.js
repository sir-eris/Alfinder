import { GET_HOME_SUCCESS } from '../actions/types';

const initialState = {
    slides: [],
    recommendations: [],
    collections: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_HOME_SUCCESS:
            return {
                ...state,
                recommendations: action.payload.recommendations,
                collections: action.payload.collections,
            }
        default:
            return state;
    }
}