import { convertArrayToObject } from "../utils";
import axios from 'axios'


const returnErrors = (msg, status, id) => {
	return (dispatch) => {
		dispatch({
			type: 'GET_ERRORS',
			payload: { msg, status, id }
		});
	};
};

const clearErrors = () => {
	return {
		type: 'CLEAR_ERRORS'
	}
}

const oneLocationData = (type, id) => {
    return (dispatch) => {
        axios.get(`/api/location/${id}`)
        .then(res => dispatch({type,payload:res.data}))
        .catch(err => console.log(err))
    }
}

export { oneLocationData, returnErrors, clearErrors };