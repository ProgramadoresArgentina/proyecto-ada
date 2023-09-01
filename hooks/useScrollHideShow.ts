import { RefObject, useEffect, useRef, useState } from "react";

const useScrollHideShow = (elementRef: RefObject<HTMLElement>): boolean => {
	const [hide, setHide] = useState(false);
	const prevScrollY = useRef<number>(0);

	useEffect(() => {
		const handleScroll = () => {
			const element = elementRef.current;
			if (element) {
				const currentScrollY = window.scrollY;
				currentScrollY < prevScrollY.current
					? setHide(false)
					: setHide(true);
				prevScrollY.current = currentScrollY;
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [elementRef]);

	return hide;
};

export default useScrollHideShow;
