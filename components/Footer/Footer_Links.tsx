import { FC } from "react";

const linksPages = [
	{ name: "Politicas de contenido", to: "/policies/content-policy" },
];
export const Footer_Links: FC = () => (
	<ul className="flex flex-row flex-wrap gap-10">
		{linksPages.map((link, i) => (
			<li key={i}>
				<a
					className="text-white font-poppins font-normal text-sm hover:underline"
					href={link.to}>
					{link.name}
				</a>
			</li>
		))}
	</ul>
);
