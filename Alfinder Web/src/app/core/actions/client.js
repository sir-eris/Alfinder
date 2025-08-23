import axios from 'axios'
import { tokenConfig } from './auth'
import {
	GET_CLIENTS,
    CREATE_CLIENT
} from './types'


export const getClients = () => (dispatch, getState) => {
    axios.post('https://api.alfinder.com/clients', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_CLIENTS,
                payload: res.data,
            });
        }).catch(err => {
            // dispatch({type: AUTH_ERROR, payload: err});
            // console.log(err)
        })
}

export const createClient = (name, website, address, phone, industry, size, revenue, is_physical) => (dispatch, getState) => {
    const body = JSON.stringify({name, website, address, phone, industry, size, revenue, is_physical})

    axios.post('https://api.alfinder.com/client/create', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CREATE_CLIENT,
                payload: res.data,
            })
        }).catch(err => {
            // dispatch({type: AUTH_ERROR, payload: err});
            // console.log(err)
        })
}