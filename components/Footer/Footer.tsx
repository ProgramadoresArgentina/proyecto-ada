import Image from "next/image";
import { FC } from "react";
import Logo from "../../public/footer/logo_footer.svg";
import { Footer_Copy } from "./Footer_Copy";
import { Footer_Divider } from "./Footer_Divider";
import { Footer_Links } from "./Footer_Links";
import { Footer_Socials } from "./Footer_Socials";

export const Footer: FC = () => (
	<section
		className="w-full h-[500px] px-8 py-8 mt-3 bg-greylight flex flex-col justify-evenly items-start
                            sm:py-5 sm:px-28">
		<Footer_Divider />
		<Image src={Logo} alt="Programadores Argentina" className="-ml-4" />
		<Footer_Links />
		<Footer_Socials />
		<Footer_Divider />
		<Footer_Copy />
	</section>
);