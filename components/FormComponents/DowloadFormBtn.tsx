import { MouseEventHandler } from "react";

interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
}
const DownloadFormBtn: React.FC<Props> = ({ onClick }) => {
    return (
        <button
            className="bg-shadeBlue rounded w-48 h-10 content-center justify-center px-2 m-2"
            onClick={onClick}
            type="button"
        >
            <p className="text-white text-xs font-normal mx-1">Descargar</p>
        </button >
    )
}
export default DownloadFormBtn