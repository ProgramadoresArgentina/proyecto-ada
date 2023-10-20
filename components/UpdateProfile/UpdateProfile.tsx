import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
	linkSocials,
	listPositions,
	senioritys,
	status,
} from "../../constants/constants";
import { launchToast } from "../../helpers/launchToast";
import { useFetch } from "../../hooks/useFetch";
import {
	ErrorMsgState,
	UpdateProfileProps,
	UserProfileProps,
} from "../../interface/types";
import { AccordionRadioButton } from "./AccordionRadioButton";
import { HeaderDropdown } from "./HeaderDropdown";

const regex = /^[a-zA-Z0-9]*$/;

export const UpdateProfile = ({
	openDialog,
	handleDialog,
}: UpdateProfileProps) => {
	const { data, error, fetchData } = useFetch();
	const dialogRef = useRef(null);
	const [errorMsg, setErrorMsg] = useState<ErrorMsgState>({
		url: "",
		description: "",
		position: "",
	});
	const [positions, setPositions] = useState<string[]>([]);

	const [userProfile, setUserProfile] = useState<UserProfileProps>({
		linkedin: "",
		github: "",
		behance: "",
		portfolio: "",
		seniority: "junior",
		status: "miembro",
		position: "",
		url: "",
		description: "Miembro de Programadores Argentina",
	});

	const handleOnChange = (event: any) => {
		const inputValue = event.target.value;
		const inputName = event.target.name;
		if (!inputName) return;
		if (inputName === "position") {
			if (positions.includes(inputValue)) {
				setPositions(positions.filter((pos) => pos !== inputValue));
			} else {
				if (positions.length < 4) {
					setPositions([...positions, inputValue]);
				}
			}
		} else {
			setUserProfile({
				...userProfile,
				[inputName]: inputValue,
			});
		}
	};

	useEffect(() => {
		setErrorMsg({
			...errorMsg,
			position: `${positions.length}/4`,
		});
	}, [positions]);

	const handleBlur = (event) => {
		const inputValue = event.target.value;
		const inputName = event.target.name;

		if (inputName === "url") {
			!regex.test(inputValue) ||
			inputValue.length > 25 ||
			inputValue.length < 3
				? setErrorMsg({
						...errorMsg,
						[inputName]:
							"* Entre 3 y 25 caracteres que contengan solo letras y números *",
				  })
				: setErrorMsg({
						...errorMsg,
						[inputName]: "",
				  });
			setUserProfile({ ...userProfile, [inputName]: inputValue });
		}
		if (inputName === "description") {
			inputValue.length > 250 || inputValue.length < 3
				? setErrorMsg({
						...errorMsg,
						[inputName]:
							"* Entre 3 y 250 caracteres que contengan solo letras y números *",
				  })
				: setErrorMsg({
						...errorMsg,
						[inputName]: "",
				  });
			setUserProfile({ ...userProfile, [inputName]: inputValue });
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		let body = {
			...userProfile,
			position: positions.join(" - "),
		};
		console.table(body);

		// fetchData("/api/users/userSettings/editUrl", "PUT", body);
	};

	// USEEFFECT PARA  CERRAR EL MODAL Y LANZAR UN TOAST
	useEffect(() => {
		if (data) {
			launchToast("success", "URL actualizada");
			setTimeout(() => {
				dialogRef.current.close();
			}, 1000);
		}
		if (error) {
			launchToast("error", "Error al actualizar la URL");
		}

		return () => {
			toast.dismiss();
		};
	}, [data, error]);

	// USEEFFECT PARA  ABRIR EL MODAL Y CERRAR EL MODAL
	useEffect(() => {
		openDialog ? dialogRef.current.showModal() : dialogRef.current.close();
	}, [openDialog]);

	// !TODO - USEEFFECT QUE TRAERIA LOS DATOS DEL USUARIO LOGEADO
	// PARA ACTUALIZAR LOS CAMPOS
	useEffect(() => {
		// console.log("ABRE MODAL");
		// console.log("TRAE LOS DATOS");
		// console.log("RELLENA LOS CAMPOS");
	}, []);

	return (
		<dialog
			ref={dialogRef}
			onClose={handleDialog}
			className="w-screen h-screen shadow-2xl backdrop-blur-md bg-white/20 max-w-full max-h-full no-scrollbar">
			<div
				onClick={handleDialog}
				className="m-auto w-full h-full flex flex-col justify-start items-center pt-[150px]">
				<form
					onClick={(e) => e.stopPropagation()}
					onSubmit={handleSubmit}
					className="bg-[#0D1116] w-full max-w-[600px] px-8 pt-6 pb-8 mb-4 rounded-md xl:px-4 xl:pt-3 xl:pb-4 xl:mb-2 ">
					{/* EXPERIENCIA */}
					<AccordionRadioButton
						title="Experiencia"
						options={senioritys}
						radioGroup="seniority"
						userProp={userProfile.seniority}
						handleChange={handleOnChange}
					/>
					<div className="h-[1px] w-full bg-slate-500 my-2" />
					{/* FIN EXPERIENCIA */}
					{/* ------------------------------ */}
					{/* STATUS */}
					<AccordionRadioButton
						title="Status"
						options={status}
						radioGroup="status"
						userProp={userProfile.status}
						handleChange={handleOnChange}
					/>
					<div className="h-[1px] w-full bg-slate-500 my-2" />
					{/* FIN STATUS */}
					{/* ------------------------------ */}
					{/* POSITION */}
					<details className="group flex flex-col justify-start items-center transition ease-in-out delay-150 py-2">
						<HeaderDropdown
							title={`Posición - ${errorMsg.position}`}>
							{positions.length >= 4 && (
								<button
									onClick={() => setPositions([])}
									className="text-red-600 pl-4">
									❌ Reset
								</button>
							)}
						</HeaderDropdown>
						<div className="text-neutral-600 mt-3 group-open:animate-fadeIn h-[200px] overflow-y-scroll no-scrollbar">
							{listPositions.map(({ id, name }) => (
								<div
									key={id}
									className="flex items-center w-full pl-4 my-2 gap-2 bg-gray-100 rounded-md hover:bg-orangePA cursor-pointer">
									<input
										id={id.toString()}
										type="checkbox"
										name="position"
										value={name}
										className="w-4 h-4 focus:accent-indigo-800 accent-indigo-800 cursor-pointer"
										onChange={handleOnChange}
										disabled={positions.length >= 4}
										checked={positions.includes(name)}
									/>
									<label
										htmlFor={id.toString()}
										className="ml-2 py-2 w-full h-full text-base font-medium text-gray-900 cursor-pointer">
										{name}
									</label>
								</div>
							))}
						</div>
					</details>
					<div className="h-[1px] w-full bg-slate-500 my-2" />
					{/* FIN POSITION */}
					{/* ------------------------------ */}
					{/* URL */}
					<div className="mb-2 flex flex-col justify-start items-start gap-1 pb-2">
						<label
							className="leading-8 text-gray-100 flex flex-col w-full justify-start items-start min-h-[50px]
							sm:flex-row sm:justify-start sm:items-center sm:gap-3 sm:min-h-0">
							<div className="w-max">URL Profile</div>
							<p className="text-red-500 text-xs italic  w-max">
								{errorMsg.url}
							</p>
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 text-sm"
							name="url"
							type="text"
							placeholder="programadoresargentina.com/pro/...."
							onChange={handleOnChange}
							value={userProfile.url}
							onBlur={handleBlur}
						/>
					</div>
					<div className="h-[1px] w-full bg-slate-500 my-2" />
					{/* FIN URL */}
					{/* ------------------------------ */}
					{/* DESCRIPCION */}
					<div className="mb-2 flex flex-col justify-start items-start gap-1 pb-2">
						<label
							className="leading-8 text-gray-100 flex flex-col w-full justify-start items-start min-h-[50px]
							sm:flex-row sm:justify-start sm:items-center sm:gap-3 sm:min-h-0">
							<div className="w-max">Descripción</div>
							<p className="text-red-500 text-xs italic  w-max">
								{errorMsg.description}
							</p>
						</label>
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 text-sm resize-none"
							name="description"
							onChange={handleOnChange}
							value={userProfile.description}
							onBlur={handleBlur}
						/>
					</div>
					<div className="h-[1px] w-full bg-slate-500 my-2" />
					{/* FIN DESCRIPCION */}
					{/* ------------------------------ */}
					{/* REDES */}
					<details className="group flex flex-col justify-start items-center transition ease-in-out delay-150 py-2">
						<HeaderDropdown title="Redes" />
						<div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
							{linkSocials.map(({ id, value, link }) => (
								<div
									key={id}
									className="relative mb-4 flex flex-wrap items-stretch rounded-md border">
									<label
										htmlFor={value}
										className="w-[130px] text-gray-100 py-2 px-2 text-right cursor-pointer">
										{link}
									</label>
									<input
										id={value}
										type="text"
										name={value}
										className="relative m-0 block w-[1px] min-w-0 flex-auto shadow appearance-none border rounded-r-sm py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 text-sm"
										onChange={handleOnChange}
									/>
								</div>
							))}
						</div>
					</details>
					<div className="h-[1px] w-full bg-slate-500 my-2" />
					{/* FIN REDES */}
					{/* ------------------------------ */}
					<div className="flex items-center justify-between gap-1 mt-3">
						<button
							onClick={() => dialogRef.current.close()}
							className="bg-[#F78001] hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="button">
							Cerrar
						</button>
						<button
							className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline plain-button"
							type="submit">
							Actualizar
						</button>
					</div>
				</form>
			</div>
			<ToastContainer />
		</dialog>
	);
};
