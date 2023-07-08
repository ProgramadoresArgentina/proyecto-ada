// import { useUser } from "@auth0/nextjs-auth0/client";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFetch } from "../../hooks/useFetch";

const Validate: NextPage = () => {
	const divMessageRef = useRef(null);
	const searchParams = useSearchParams();
	const urlParam = searchParams.get("redirect");
	const { data, loading, error, fetchData } = useFetch();

	const updateStatus = (value: string, redirect: string) => {
		divMessageRef.current.innerText = value;
	};

    useEffect(() => {
		fetchData("/api/auth/first-validation", "GET", {
			redirectTo: urlParam
		});
    }, [])

	useEffect(() => {
		if (error)
			updateStatus(`Error al validar , redireccionando a Home`, "/");
		if (data)
			updateStatus(
				`Usuario valido , redireccionando a ${urlParam}`,
				urlParam
			);
	}, [loading]);

	return (
		<div className="w-full min-h-screen flex justify-start flex-col items-center gap-6 pt-14 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 cursor-wait">
			<div className=" h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
				<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
					Loading...
				</span>
			</div>
			<span className="flex justify-center w-full">
				<span
					ref={divMessageRef}
					className="absolute inline-flex rounded-full font-roboto text-white text-xl text-center font-semibold uppercase
							md:text-3xl
					">
					Validando usuario
				</span>
			</span>
		</div>
	);
};
export default Validate;
