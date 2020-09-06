import domainData from './domainData';
import itemsData from './itemsData';
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import cartData from './cartData'


import { combineReducers } from 'redux';

const allReducers = combineReducers({
    domainData,
    itemsData,
    errorReducer,
    authReducer,
    cartData
})

export default allReducers;
