import Image from "next/image";
import { FC } from "react";
import { AvatarsProps } from "../../interface/types";

//MOCK MEMBERS AVATAR
const avatars = [
	{
		id: 1,
		image: "https://i.pravatar.cc/320",
		name: "Name 1",
	},
	{
		id: 2,
		image: "https://i.pravatar.cc/280",
		name: "Name 2",
	},
	{
		id: 3,
		image: "https://i.pravatar.cc/290",
		name: "Name 3",
	},
	{
		id: 4,
		image: "https://i.pravatar.cc/250",
		name: "Name 4",
	},
	{
		id: 5,
		image: "https://i.pravatar.cc/300",
		name: "Name 5",
	},
	{
		id: 6,
		image: "https://i.pravatar.cc/310",
		name: "Name 6",
	},
];

export const Hero_Avatars: FC<AvatarsProps> = ({ followers, members }) => (
	<div className="hidden md:flex font-manrope text-blueStrong text-sm flex-row justify-start items-center flex-nowrap ml-3 pt-3">
		{avatars.map((avatar) => (
			<Image
				alt={avatar.name}
				className="-ml-4 rounded-full"
				height={35}
				key={avatar.id}
				src={avatar.image}
				width={35}
			/>
		))}
		<p className="ml-2 font-poppins text-base font-medium color text-blueStrong">
			+{followers}k miembros
		</p>
	</div>
);
