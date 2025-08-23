import { combineReducers } from 'redux';

import homeReducer from './homeReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import productReducer from './productReducer';
import subscriberReducer from './subscriberReducer';
import wishlistReducer from './wishlistReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
    homeReducer,
    authReducer,
    cartReducer,
    orderReducer,
    productReducer,
    wishlistReducer,
    subscriberReducer,
    notificationReducer,
});