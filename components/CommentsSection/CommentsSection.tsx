import { FC, useState } from "react";
import { useSizeScreen } from "../../hooks/useSizeScreen";
import { ComentsSectionProps } from "../../interface/types";
import { Comment } from "./Comment";
import { LoadingComments } from "./LoadingComments";
import { MarqueeCustom } from "./MarqueeCustom";

const LGSIZE = 1030;
const VELOCITY = 18;

export const CommentsSection: FC<ComentsSectionProps> = ({
	commentsList,
}: ComentsSectionProps) => {
	const { sizeScreen } = useSizeScreen();
	const [loading, setLoading] = useState(true);
	const [marqueeVelocity, setMarqueeVelocity] = useState(VELOCITY);

	const handleLoading = (value: boolean) => {
		setLoading(value);
		if (sizeScreen < LGSIZE) setLoading(false);
	};

	const handleStopMarquee = () => setMarqueeVelocity(0);
	const handleStartMarquee = () => setMarqueeVelocity(VELOCITY);

	const renderComments = () =>
		commentsList.map(({ id, image, text }) => (
			<Comment image={image} key={id} text={text} />
		));

	const renderMarqueeMobile = () => {
		if (!sizeScreen || sizeScreen >= LGSIZE) return;
		return (
			<MarqueeCustom
				marqueeVelocity={marqueeVelocity}
				onInit={() => handleLoading(false)}
				scatterRandomly={false}>
				{renderComments()}
			</MarqueeCustom>
		);
	};

	const renderMarqueeDesktop = () => {
		if (!sizeScreen || sizeScreen < LGSIZE) return;
		return (
			<MarqueeCustom
				marqueeVelocity={marqueeVelocity}
				onFinish={() => handleLoading(false)}
				onInit={() => handleLoading(true)}
				scatterRandomly={true}>
				{renderComments()}
			</MarqueeCustom>
		);
	};

	return (
		<section
			className="m-auto w-full min-h-[200px] py-1 flex justify-start relative
						md:min-h-[100px]
						lg:h-[260px]"
			onMouseDown={handleStopMarquee}
			onMouseUp={handleStartMarquee}
			onTouchEnd={handleStartMarquee}
			onTouchStart={handleStopMarquee}>
			{loading && <LoadingComments />}
			{renderMarqueeDesktop()}
			{renderMarqueeMobile()}
		</section>
	);
};
