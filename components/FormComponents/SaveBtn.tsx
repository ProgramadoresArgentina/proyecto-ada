import { MouseEventHandler } from "react";
interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
}
const SaveBtn: React.FC<Props> = ({ onClick }) => {
    return (
        <button
            type="button"
            className="bg-yellow  
            rounded w-48 h-10 content-center justify-center px-2 m-2 "
            onClick={onClick}
        >
            <p className="text-white text-xs font-normal mx-1">Guardar</p>
        </button>
    )
}
export default SaveBtn