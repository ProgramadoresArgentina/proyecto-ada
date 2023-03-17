import Image from "next/image";
import { FC } from "react";

export const Hero_Image: FC = () => (
	<div className="absolute right-0 w-full min-[1000px]:w-1/2 flex justify-end min-[1000px]:relative">
		<Image
			alt="figure"
			className="right-0 top-0 -z-10 hidden max-[1099px]:flex w-auto"
			height={200}
			priority
			src="/hero/blob_yellow2.png"
			width={100}
		/>
		<Image
			alt="hero_image"
			className="hidden min-[1100px]:flex w-full right-0 top-auto h-full"
			height={180}
			priority
			src="/hero/hero_image.svg"
			width={300}
		/>
		<Image
			alt="figure"
			className="absolute hidden min-[1100px]:flex -left-10 xl:-left-14 -top-[1px] -z-10"
			height={129}
			src="/hero/blob_blue.png"
			width={129}
		/>
		<Image
			alt="figure"
			className="absolute hidden min-[1100px]:flex right-28 -bottom-28 -z-10"
			height={178}
			src="/hero/blob_yellow.png"
			width={178}
		/>
	</div>
);
