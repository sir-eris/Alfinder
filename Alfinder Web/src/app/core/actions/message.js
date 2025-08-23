import axios from 'axios'
import { tokenConfig } from './auth'
import {
	SUBMIT_DEMO
} from './types'



export const submitDemo = (legal_name, industry, focus, url, phone, address, requirements, expectations, fname, lname, role, email, contact_phone, note) => dispatch => {
	const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({legal_name, industry, focus, url, phone, address, requirements, expectations, fname, lname, role, email, contact_phone, note});

    axios.post('https://api.alfinder.com/demo', body, config)
        .then(res => {
            dispatch({
                type: SUBMIT_DEMO,
                payload: res.data,
            });
        }).catch(err => {
            // dispatch({type: AUTH_ERROR, payload: err});
            // console.log(err)
        })
}