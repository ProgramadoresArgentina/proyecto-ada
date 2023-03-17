import { useEffect, useState } from "react";

export const useSizeScreen = () => {
	const [sizeScreen, setSizeScreen] = useState(null);

	const handleSizeScreen = () => {
		setSizeScreen(window.innerWidth);
	};

	useEffect(() => {
		handleSizeScreen();
		window.addEventListener("resize", handleSizeScreen);
		return () => window.removeEventListener("resize", handleSizeScreen);
	});

	return { sizeScreen };
};
