import { MouseEventHandler } from "react";


interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const RemoveBtn: React.FC<Props> = ({ onClick }) => {
    return (
        <button
            type="button"
            className="bg-gray-100 hover:bg-red-400 rounded px-3 py-2 text-black"
            onClick={onClick}
        >
            <p className="text-xs font-normal">eliminar</p>
        </button>

    )
}

export default RemoveBtn