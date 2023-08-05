import { FC } from "react";

export const Title: FC = () => (
	<div
		className="absolute top-16 left-0 right-0 w-[98%] h-max pl-[10%] flex flex-col justify-start gap-y-6
					md:top-28
					md:gap-y-16
					xl:bg-navyBlue xl:w-1/2 xl:static xl:mt-0 xl:top-0 xl:justify-center xl:h-full ">
		<div className="flex flex-col justify-start gap-y-3 font-roboto">
			<p
				className="text-greyText text-[26px] font-medium
							sm:text-3xl">
				Blog
			</p>
			<h2
				className="max-w-[420px] text-[40px] leading-tight text-white font-medium 
							sm:text-[65px]">
				Programadores Argentina
			</h2>
			<p
				className="text-sm text-greyTextLight
							sm:text-base">
				Articulos compartidos por la comunidad.
			</p>
		</div>
		<button
			className="w-max text-white flex flex-row items-center px-12 py-3 bg-orangePA rounded-3xl ease-in duration-100 text-base font-roboto font-medium
						hover:bg-orangePAHover">
			<p className="mr-12">Publicar</p>
			<svg
				fill="none"
				height="17"
				viewBox="0 0 17 17"
				width="17"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M16.5186 7.95645L8.03281 0.591504C7.96768 0.535351 7.88457 0.503906 7.79697 0.503906H5.80918C5.64297 0.503906 5.5666 0.710547 5.69238 0.818359L13.5582 7.64648H0.414063C0.315234 7.64648 0.234375 7.72734 0.234375 7.82617V9.17383C0.234375 9.27266 0.315234 9.35352 0.414063 9.35352H13.556L5.69014 16.1816C5.56436 16.2917 5.64072 16.4961 5.80693 16.4961H7.86211C7.90479 16.4961 7.94746 16.4804 7.97891 16.4512L16.5186 9.04356C16.5963 8.97594 16.6587 8.89243 16.7014 8.79866C16.7441 8.70489 16.7662 8.60304 16.7662 8.5C16.7662 8.39696 16.7441 8.29511 16.7014 8.20134C16.6587 8.10757 16.5963 8.02406 16.5186 7.95645Z"
					fill="white"
				/>
			</svg>
		</button>
	</div>
);
