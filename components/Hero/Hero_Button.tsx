import { FC } from "react";
import { useSizeScreen } from "../../hooks/useSizeScreen";

export const Hero_Button: FC = () => {
	const { sizeScreen } = useSizeScreen();

	return (
		sizeScreen && (
			<button className="bg-shadeBlue hover:bg-shadeBlueHover ease-in duration-100 text-white font-normal tracking-tight md:tracking-normal text-xs min-[360px]:text-sm md:text-base rounded-full py-3 mt-10 px-8 ">
				{sizeScreen < 1000
					? "Quiero ser parte del próximo proyecto!"
					: "Bolsa de talentos"}
			</button>
		)
	);
};
