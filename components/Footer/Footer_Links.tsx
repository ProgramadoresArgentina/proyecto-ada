import { FC } from "react";

const linksPages = [
	{ id: 1, name: "About Us", to: "#" },
	{ id: 2, name: "Press", to: "#" },
	{ id: 3, name: "Investors", to: "#" },
	{ id: 4, name: "Events", to: "#" },
	{ id: 5, name: "Terms of use", to: "#" },
	{ id: 6, name: "Privacy policy", to: "#" },
];
export const Footer_Links: FC = () => (
	<ul className="flex flex-row flex-wrap gap-10">
		{linksPages.map((link) => (
			<li key={link.id}>
				<a
					className="text-greyMedium font-poppins font-normal text-sm hover:text-grey"
					href={link.to}>
					{link.name}
				</a>
			</li>
		))}
	</ul>
);
