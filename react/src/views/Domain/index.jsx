import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import DisplayItems from "../../components/DisplayItems";

function Domain() {
    const { domain } = useParams()
    const { itemsData } = useSelector((state) => state)

    return (
        <div>
            {domain}
            <DisplayItems
                items={Object.values(itemsData).filter((e) => e.domain === domain)}
            />
        </div>
    );
}

export default Domain;