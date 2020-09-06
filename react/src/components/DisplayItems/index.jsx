import React from "react";
import { useHistory } from "react-router-dom";

function DisplayItems({ items }) {
	const history = useHistory();

	const handleClick = {
		item: (item) => {
			history.push(`/item/${item.id}`);
		},
	};

	return (
		<>
			{items.map((item) => (
				<div
					style={{
						background: "#eee",
						margin: "2rem",
						padding: "2rem",
						cursor: "pointer",
					}}
					key={item.id}
					onClick={() => handleClick.item(item)}
				>
					<p>{item.id}</p>
					<p>{item.domain}</p>
					<p>{item.productCode}</p>
					<p>{item.brandName}</p>
					<p>{item.productName}</p>
					<img src={item.img} />
				</div>
			))}
		</>
	);
}

export default DisplayItems;
