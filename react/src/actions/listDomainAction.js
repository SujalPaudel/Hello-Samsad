import { convertArrayToObject } from "../utils";


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


const fetchDomainData = () => {
	return (dispatch) => {
		const data = [
			{ id: 1, name: "Home", route: "" },
			{ id: 2, name: "Representative", route: "representative" },
			{ id: 3, name: "Browse Politician", route: "browse-politician" },
			{ id: 4, name: "Voter Tools", route: "voter-tools" },
		];

		dispatch({
			type: 'POPULATE_DOMAIN',
			payload: data,
		});
	};
};

const fetchItemsData = ({ type, filter }) => {
	return (dispatch) => {
		const data = [
			{
				id: 1,
				domain: "Electronics",
				productCode: "AB12",
				brandName: "philips",
				productName: "Head Massage",
				img: "1293.jpg",
				minimum_units: 6,
				pinct_price: 300,
				taken_units: 3
			},
			{
				id: 2,
				domain: "Oil",
				productCode: "ER69",
				brandName: "Ram Tel Pasal",
				productName: "Lube",
				img: "1243.jpg",
				minimum_units: 12,
				pinct_price: 60,
				taken_units: 3
			},
			{
				id: 3,
				domain: "Food",
				productCode: "TB12",
				brandName: "Maccer",
				productName: "Cabbage",
				img: "1293.jpg",
				minimum_units: 18,
				pinct_price: 30,
				taken_units: 6
			},
			{
				id: 4,
				domain: "Electronics",
				productCode: "AB31",
				brandName: "Sony",
				productName: "Massager",
				img: "3293.jpg",
				minimum_units: 24,
				pinct_price: 200,
				taken_units: 11
			},
		];

		dispatch({
			type,
			payload: convertArrayToObject(data, "id"),
		});
	};
};

export { fetchDomainData, fetchItemsData, returnErrors, clearErrors };