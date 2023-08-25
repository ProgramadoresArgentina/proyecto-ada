import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { launchToast } from "../../helpers/launchToast";
import { useFetch } from "../../hooks/useFetch";

const regex = /^[a-zA-Z0-9]*$/;

export const UpdateProfile = ({ openDialog, handleDialog }) => {
	const { data, error, fetchData } = useFetch();
	const { data: dataUrl, fetchData: fetchUrl } = useFetch();
	const dialogRef = useRef(null);
	const [errorMsg, setErrorMsg] = useState(false);
	const [urlUpdate, setUrlUpdate] = useState("");
	const [placeholder, setPlaceholder] = useState("");

	useEffect(() => {
		openDialog ? dialogRef.current.showModal() : dialogRef.current.close();
	}, [openDialog]);

	const handleInput = ({ target }) => {
		!regex.test(target.value) ||
		target.value.length > 15 ||
		target.value.length < 3
			? setErrorMsg(true)
			: setErrorMsg(false);

		setUrlUpdate(target.value);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		let body = {
			data: urlUpdate,
		};

		fetchData("/api/users/userSettings/editUrl", "PUT", body);
	};

	useEffect(() => {
		if (data) {
			setPlaceholder(urlUpdate);
			setUrlUpdate("");
			launchToast("success", "URL actualizada");
            setTimeout(() => {
                dialogRef.current.close()
            }, 1000);
		}
		if (error) {
			launchToast("error", "Error al actualizar la URL");
		}

		return () => {
			toast.dismiss();
		};
	}, [data, error]);

	useEffect(() => {
		dataUrl
			? setPlaceholder(dataUrl.title)
			// : fetchUrl("/api/users/userSettings/");
            : '';
		console.log(dataUrl);
	}, [dataUrl]);

	return (
		<dialog
			ref={dialogRef}
			onClose={handleDialog}
			className="w-screen h-screen shadow-2xl backdrop-blur-md bg-white/20 max-w-full max-h-full">
			<div
				onClick={handleDialog}
				className="m-auto w-full h-full flex flex-col justify-center items-center">
				<form
					onClick={(e) => e.stopPropagation()}
					onSubmit={handleUpdate}
					className="bg-[#0D1116] w-72 px-8 pt-6 pb-8 mb-4 rounded-md 
                                    xl:px-4 xl:pt-3 xl:pb-4 xl:mb-2">
					<div className="mb-2 flex flex-col justify-start items-start gap-1 min-h-[110px]">
						<label
							className="text-sm leading-8 text-gray-100"
							htmlFor="URL">
							URL del perfil
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 text-sm"
							id="URL"
							type="text"
							placeholder={placeholder}
							onChange={handleInput}
							value={urlUpdate}
						/>
						{errorMsg && (
							<p className="text-red-500 text-xs italic ml-1">
								Entre 3 y 15 caracteres que contengan solo
								letras y números.
							</p>
						)}
					</div>
					<div className="flex items-center justify-between gap-1">
						<button
							onClick={() => dialogRef.current.close()}
							className="bg-[#F78001] hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="button">
							Cerrar
						</button>
						<button
							className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline plain-button"
							type="submit"
							disabled={urlUpdate === "" || errorMsg}>
							Actualizar
						</button>
					</div>
				</form>
			</div>
			<ToastContainer />
		</dialog>
	);
};
