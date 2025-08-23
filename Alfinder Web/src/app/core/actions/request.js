import axios from 'axios'
import { tokenConfig } from './auth'
import {
	GET_ANALYSIS,
	SUBMIT_REQUEST,
	GET_PENDING_REQUESTS,
	GET_COMPLETE_REQUESTS,
} from './types'


export const submitRequest = (
	client,
	analysisA,
	analysisB,
	expenditure,
	returns,
	requirements,
	expectations,
	current_target,
	description,
	goal,
	note,
) => (dispatch, getState) => {
	const body = JSON.stringify({
		client,
		analysisA,
		analysisB,
		expenditure,
		returns,
		requirements,
		expectations,
		current_target,
		description,
		goal,
		note,
	});

    axios.post('https://api.alfinder.com/requests/create', body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: SUBMIT_REQUEST,
            payload: res.data,
        })
    }).catch()
};


export const getPendingRequests = () => (dispatch, getState) => {
    axios.post('https://api.alfinder.com/requests/pending', null, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_PENDING_REQUESTS,
            payload: res.data,
        })
    }).catch()
};

export const getCompleteRequests = () => (dispatch, getState) => {
    axios.post('https://api.alfinder.com/requests/complete', null, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_COMPLETE_REQUESTS,
            payload: res.data,
        })
    }).catch()
};


export const getAnalysis = (request_id) => (dispatch, getState) => {
    axios.post('https://api.alfinder.com/requests/analysis', JSON.stringify({request_id}), tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_ANALYSIS,
            payload: res.data,
        })
    }).catch()
};
