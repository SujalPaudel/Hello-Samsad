import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from '../../actions/authAction'

import { fetchDomainData, fetchItemsData } from "../../actions/listDomainAction";

function useInitialize() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
        dispatch(fetchDomainData());
        // dispatch(fetchItemsData({ type: "POPULATE_ITEMS", filter: [] }));
    }, [])
}

export default useInitialize;

