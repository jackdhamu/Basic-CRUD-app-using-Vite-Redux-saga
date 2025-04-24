// src/redux/reducers/index.js

import { combineReducers } from 'redux';
import blogReducer from './blogReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    blogs: blogReducer,
    auth: authReducer, // Add your auth reducer here
});

export default rootReducer;