import { combineReducers } from 'redux';
import userReducer from './userReducer';
import carReducer from './carReducer';

export default combineReducers({
    userReducer,
    carReducer
});