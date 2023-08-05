import Image from "next/image";
import { LINKS_URL_SOCIALS } from "../../../constants/constants";
import { openInNewTab } from "../../../helpers/openInNewTab";

import { FC } from "react";
import { ImageBg } from "./ImageBg";
import { Socials } from "./Socials";
import { Title } from "./Title";

export const Hero: FC = () => (
	<section
		className="relative w-full h-[450px] flex flex-row justify-center items-center 
					md:h-[600px]">
		<Title />
		<ImageBg />
		<Socials />
	</section>
);
