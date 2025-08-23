import { combineReducers } from 'redux'

import authReducer from './authReducer'
import clientReducer from './clientReducer'
import requestReducer from './requestReducer'
import messageReducer from './messageReducer'
import settingsReducer from './settingsReducer'
import notificationReducer from './notificationReducer'

export default combineReducers({
    authReducer,
    clientReducer,
    requestReducer,
    messageReducer,
    settingsReducer,
    notificationReducer,
})
