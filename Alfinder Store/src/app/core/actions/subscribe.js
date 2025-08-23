import axios from 'axios';
import {
    SUBSCRIBED_SUCCESS,
    UNSUBSCRIBED_SUCCESS,
} from './types';

// SUBSCRIBE
export const subscribe = email => dispatch => {
    axios.post('https://alfinder.com/alfinder/public/api/subscriber/add', {email: email})
    .then(res => {
        console.log(res);
        dispatch({
            type: SUBSCRIBED_SUCCESS,
            payload: res.data.data,
        })
    }).catch(err => console.log(err))
}

// UNSUBSCRIBE
export const unsubscribe = email => dispatch => {
    axios.post('https://alfinder.com/alfinder/public/api/subscriber/remove', {email: email})
    .then(res => {
        console.log(res);
        dispatch({
            type: UNSUBSCRIBED_SUCCESS,
            payload: res.data,
        })
    }).catch(err => console.log(err))
}
