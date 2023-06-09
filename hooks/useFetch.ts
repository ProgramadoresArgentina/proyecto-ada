import { useState } from "react";

export const useFetch = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async (
		url: string,
		action: string = "GET",
		body: object = {},
		type: string = "Content-Type",
		headers: string = "application/json"
	) => {
		try {
			if (action === "GET") {
				const response = await fetch(url);
				const jsonData = await response.json();
				setData(jsonData);
				setLoading(false);
			} else {
				const response = await fetch(url, {
					method: action,
					headers: {
						[type]: headers,
					},
					body: JSON.stringify(body),
				});
				const jsonData = await response.json();
				setData(jsonData);
				setLoading(false);
			}
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	return {
		loading,
		data,
		error,
		fetchData,
	};
};
