const getUsers = async (id?: string | string[]) => {
	try {
		const res = await fetch(`http://localhost:3000/api/users/${id}`);
		const userData = await res.json();
		return userData;
	} catch (err) {
		throw new Error(err);
	}
};

export default getUsers;
