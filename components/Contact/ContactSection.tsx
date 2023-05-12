import React, { FC } from "react";
import { ContactForm } from "./ContactForm";
import { ContactTexts } from "./ContactTexts";

export const ContactSection: FC = () => (
	<section className="w-full py-4 h-auto bg-blueNavy">
		<div
			className="m-auto max-w-[1150px] px-4 flex flex-col justify-start items-start text-white font-manrope
							min-[950px]:h-60 min-[950px]:min-h-[350px] min-[950px]:px-8 min-[950px]:flex-row min-[950px]:items-center
							lg:px-14 
							">
			<ContactTexts />
			<ContactForm />
		</div>
	</section>
);
