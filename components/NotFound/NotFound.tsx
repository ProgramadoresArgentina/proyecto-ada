import Link from "next/link";

export const NotFound = ({ title, content, url, buttonName }) => {
	return (
		<main className="grid min-h-screen place-items-center bg-[#0D1116] px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center flex justify-start items-center flex-col">
				<h1
					className="mt-2 text-5xl font-bold tracking-tight font-roboto text-gray-300 
                                md:text-6xl ">
					{title}
				</h1>
				<p
					className="mt-6 text-base leading-6 text-gray-500 max-w-lg text-center
                                md:text-lg md:leading-8">
					{content}
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link
						href="/login"
						className="plain-button rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Registrarse
					</Link>
					<Link
						href={url}
						className="text-sm font-semibold text-white">
						{buttonName} <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
		</main>
	);
};
