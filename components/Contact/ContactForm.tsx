import emailjs from "@emailjs/browser";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { SetState } from "../../interface/types";

const REGEX_EMAIL =
	/^(?!.*(\.\.|__|-\.|\.@|@\.))[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const ContactForm: FC = () => {
	const form = useRef();
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [sended, setSended] = useState<string>("");
	const [error, setError] = useState<{
		emailError: boolean;
		messageError: boolean;
	}>({
		emailError: true,
		messageError: true,
	});

	const handleInput = (value: string, setter: SetState<string>) =>
		setter(value);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setSended("loading");

		emailjs
			.sendForm(
				process.env.SERVICE_ID_EMAILJS,
				process.env.TEMPLATE_ID_EMAILJS,
				form.current,
				process.env.USER_ID_EMAILJS
			)
			.then(() => {
				setSended("send");
				resetForm();
				setTimeout(() => setSended(""), 3000);
			})
			.catch(() => setSended("error"));
	};

	const resetForm = () => {
		setEmail("");
		setMessage("");
		setError({ emailError: true, messageError: true });
	};

	useEffect(() => {
		email !== "" &&
			setError({ ...error, emailError: !REGEX_EMAIL.test(email) });
		message !== "" &&
			setError({ ...error, messageError: message.length < 10 });
	}, [message, email, error.emailError, error.messageError]);

	return (
		<form
			className="w-full h-[280px] flex flex-col justify-start items-start max-w-md "
			onSubmit={handleSubmit}
			ref={form}>
			<div className="w-full h-16 mb-2 ">
				<input
					className="w-full h-10 px-4 text-sm bg-[#3c3c54] tracking-wide rounded-[5px] !outline-none"
					name="from_email"
					onChange={(e) =>
						handleInput(e.target.value.toLowerCase(), setEmail)
					}
					placeholder="Correo electrónico"
					typeof="email"
					value={email.toLowerCase()}
				/>
				{error.emailError && email && (
					<p className="text-[10px] mt-1 text-red-700">
						Correo electrónico incorrecto
					</p>
				)}
			</div>
			<div className="w-full h-32 mb-2">
				<textarea
					className="w-full h-28 p-4 text-sm bg-[#3c3c54] tracking-wide rounded-[5px] resize-none !outline-none"
					name="message"
					onChange={(e) => handleInput(e.target.value, setMessage)}
					placeholder="Mensaje"
					typeof="text"
					value={message}
				/>
				{error.messageError && message && (
					<p className="text-[10px] text-red-700">
						El mensaje debe contener al menos 10 caracteres
					</p>
				)}
			</div>
			<button
				className=" w-[70%] py-2 mt-2 rounded-[5px] bg-blueNormal  ease-in duration-100 text-center font-manrope tracking-wide  !outline-none flex justify-center items-center
							hover:bg-blueNormalHover
							disabled:bg-grey"
				disabled={
					error.emailError ||
					error.messageError ||
					sended === "loading"
				}>
				{sended === "loading" ? (
					<svg
						fill="none"
						className="w-6 h-6 animate-spin"
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg">
						<path
							clipRule="evenodd"
							d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
							fill="#F78000"
							fillRule="evenodd"
						/>
					</svg>
				) : (
					"Enviar"
				)}
			</button>
			{sended === "send" && (
				<p className="text-[10px] text-green-700">
					El mensaje se envio correctamente
				</p>
			)}
			{sended === "error" && (
				<p className="text-[10px] text-red-700">
					Hubo un error al enviar el mensaje
				</p>
			)}
		</form>
	);
};
