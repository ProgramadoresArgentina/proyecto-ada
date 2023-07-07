import React, { FC } from "react";

export const ContactTexts: FC = () => (
	<div
		className="w-full h-72 flex flex-col justify-center py-8
        min-[950px]:h-full min-[950px]:pt-0  min-[950px]:pb-10
        ">
		<p className="font-normal text-sm  md:text_lg">
			@programadores_argentina
		</p>
		<h3 className="font-bold tracking-tight text-4xl max-w-sm md:text-5xl pt-5">
			Formulario de contacto
		</h3>
		<p className="font-medium text-base max-w-md md:text-lg md:max-w-[420px] lg:text-xl lg:max-w-[480px] pt-5">
            Para busqueda de programadores o contactarse con el staff.
		</p>
	</div>
);
