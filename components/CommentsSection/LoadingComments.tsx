import { FC } from "react";

export const LoadingComments: FC = () => (
	<div
		className="flex items-center justify-center m-auto w-full min-h-[200px] absolute bg-white top-0 left-0 right-0 z-50
						md:min-h-[100px]
						lg:h-[260px]">
		<div className="flex justify-center items-center space-x-1 text-sm">
			<svg
				fill="none"
				className="w-6 h-6 animate-spin"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg">
				<path
					clipRule="evenodd"
					d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
					fill="currentColor"
					fillRule="evenodd"
				/>
			</svg>
			<div className="text-[#5333AE] font-medium">
				Cargando Comentarios
			</div>
		</div>
	</div>
);
