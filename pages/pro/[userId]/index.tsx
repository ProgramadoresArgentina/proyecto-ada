import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { NotFound } from "../../../components/NotFound/NotFound";
import { Portfolio } from "../../../components/Portfolio/Portfolio";
import Spinner from "../../../components/Spinner";
import { useFetch } from "../../../hooks/useFetch";

const UserPorfolio: NextPage = () => {
	const { query } = useRouter();
	const userId = query.userId;
	const { loading, data, error, fetchData } = useFetch();

	useEffect(() => {
		if (userId) {
			fetchData(`/api/users/userProfile/${userId}`);
		}
	}, [userId]);

	if (loading)
		return (
			<div className="w-full min-h-screen flex justify-center items-center bg-[#0D1116]">
				<Spinner />
			</div>
		);

	if (error || data.statusCode === 404)
		return (
			<NotFound
				title={"Usuario no encontrado"}
				content={
					"No encontramos al usuario en nuestra base de datos o el perfil no ha completado su CV. Si eres nuevo , te invitamos a registrarte y completar tu CV. Si ya formas parte de Programadores Argentina, verifica que lo hayas generado correctamente."
				}
				url={"/generarcv"}
				buttonName={"Completar CV"}
			/>
		);

	return <Portfolio user={data} />;
};

export default UserPorfolio;
