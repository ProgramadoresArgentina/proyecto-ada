const getPosts = async (id?: string) => {
	try {
		const res = await fetch(
			`http://localhost:3000/api/articles/getById/${id}`
		);
		const postData = await res.json();
		return postData;
	} catch (err) {
		throw new Error(err);
	}
};

export default getPosts;
