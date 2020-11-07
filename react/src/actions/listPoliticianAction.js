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

const onePoliticianData = (type, id) => {
    return (dispatch) => {
        const data = axios.get(`/api/people/${id}`)
        .then(res => dispatch({type,payload:res.data}))
        .catch(err => console.log(err))
    }
}

export { onePoliticianData, returnErrors, clearErrors };