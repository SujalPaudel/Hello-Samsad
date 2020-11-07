import domainData from './domainData';
import itemsData from './itemsData';
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import cartData from './cartData'
import onePoliticianDataR from './onePoliticianData'
import oneLocationDataR from './oneLocationData'


import { combineReducers } from 'redux';

const allReducers = combineReducers({
    domainData,
    itemsData,
    errorReducer,
    authReducer,
    cartData,
    onePoliticianDataR,
    oneLocationDataR
})

export default allReducers;
