import React, { FC } from "react";
import Marquee from "react-marquee-slider";
import { MarqueeCustomProps } from "../../interface/types";

const DIRECTION_MARQUEE = "rtl";
const RESET_AFTER_TRIES = 100;

export const MarqueeCustom: FC<MarqueeCustomProps> = ({
	children,
	marqueeVelocity,
	onFinish = null,
	onInit = null,
	scatterRandomly,
}: MarqueeCustomProps) => {
	return (
		<Marquee
			direction={DIRECTION_MARQUEE}
			onFinish={onFinish}
			onInit={onInit}
			resetAfterTries={RESET_AFTER_TRIES}
			scatterRandomly={scatterRandomly}
			velocity={marqueeVelocity}>
			{children}
		</Marquee>
	);
};
