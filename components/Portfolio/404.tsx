import Link from "next/link";

export const NotFound = () => {
	return (
		<main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center flex justify-start items-center flex-col">
				<h1
					className="mt-2 text-5xl font-bold tracking-tight font-roboto text-gray-900 
                                md:text-6xl ">
					Usuario no encontrado
				</h1>
				<p
					className="mt-6 text-base leading-6 text-gray-600 max-w-lg text-center
                                md:text-lg md:leading-8">
					No encontramos al usuario en nuestra base de datos. Si eres
					un nuevo usuario, te invitamos a registrarte y completar tu
					CV. Si ya formas parte de Programadores Argentina, verifica
					que hayas generado correctamente el CV.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link
						href="/login"
						className="plain-button rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Registrarse
					</Link>
					<Link
						href="/login"
						className="text-sm font-semibold text-gray-900">
						Completar CV <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
		</main>
	);
};
