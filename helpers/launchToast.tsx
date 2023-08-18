import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const launchToast = (
	type: string,
	message: string,
	position = "bottom-left",
	autoClose = 1500,
	closeOnClick = true,
	theme = "dark"
) => {
	toast[type](message, {
		position: position,
		autoClose: autoClose,
		closeOnClick: closeOnClick,
		theme: theme,
	});
};
