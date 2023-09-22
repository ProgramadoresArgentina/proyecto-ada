import Image from "next/image";
import { AccordionRadioButtonProps } from "../../interface/types";

export const AccordionRadioButton = ({
	title,
	options,
	radioGroup,
	userProp,
	handleChange,
}: AccordionRadioButtonProps) => {
	return (
		<details className="group flex flex-col justify-start items-center py-2">
			<summary className="flex justify-between items-center cursor-pointer list-none">
				<div className="text-gray-100 group-open:text-orangePA">
					{title}
				</div>
				<Image
					width={10}
					height={10}
					className="w-5 transition group-open:rotate-180"
					src="/icons/arrow_down.svg"
					alt="icon open close"
				/>
			</summary>
			<div className="text-neutral-600 mt-3 group-open:animate-fadeIn">
				{options.map((option) => (
					<div
						key={option.id}
						className="flex bg-gray-100 text-gray-900 font-medium rounded-md px-3  my-3  hover:bg-orangePA cursor-pointer">
						<input
							id={option.value}
							value={option.value}
							type="radio"
							defaultChecked={option.value === userProp}
							name={radioGroup}
							onChange={handleChange}
							className="accent-indigo-800 cursor-pointer"
						/>
						<label
							htmlFor={option.value}
							className="pl-2 py-2 w-full h-full cursor-pointer">
							{option.name}
						</label>
					</div>
				))}
			</div>
		</details>
	);
};
