import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NotFound } from "../../../components/Portfolio/404";
import { Portfolio } from "../../../components/Portfolio/Portfolio";
import Spinner from "../../../components/Spinner";
import { useFetch } from "../../../hooks/useFetch";

const UserPorfolio: NextPage = () => {
	const { query } = useRouter();
	const userId = query.userId;
	const { loading, data, error, fetchData } = useFetch();

	useEffect(() => {
		//test si no existe usuario
		if (userId) {
			if (+userId < 10) {
				fetchData(
					`https://jsonplaceholder.typicode.com/users/${userId}`
				);
			} else {
				fetchData(
					`https://jsooooonplaceholder.typicode.com/users/${userId}`
				);
			}
		}

		// userId && fetchData(`https://jsonplaceholder.typicode.com/users/${userId}`);
	}, [userId]);

	if (loading)
		return (
			<div className="w-full min-h-screen flex justify-center items-center bg-[#0D1116]">
				<Spinner />
			</div>
		);

	if (error) return <NotFound />;

	return <Portfolio user={data} />;
};

export default UserPorfolio;
