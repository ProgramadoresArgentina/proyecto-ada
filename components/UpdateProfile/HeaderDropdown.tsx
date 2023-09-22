import Image from "next/image";
import { HeaderDropdownProps } from "../../interface/types";

export const HeaderDropdown = ({ title, children }: HeaderDropdownProps) => (
	<summary className="flex justify-between items-center cursor-pointer list-none">
		<div className="text-gray-100 group-open:text-orangePA">
			{title} {children}
		</div>
		<span className="transition group-open:rotate-180">
			<Image
				width={10}
				height={10}
				className="w-5"
				src="/icons/arrow_down.svg"
				alt="icon open close"
			/>
		</span>
	</summary>
);
