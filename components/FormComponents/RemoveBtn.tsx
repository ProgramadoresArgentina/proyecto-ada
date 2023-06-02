import { MouseEventHandler } from "react";


interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const RemoveBtn: React.FC<Props> = ({ onClick }) => {
    return (
        <button
            type="button"
            className="bg-redButton rounded w-8 h-4 "
            onClick={onClick}
        >
            <p className="text-white text-xs font-normal">x</p>
        </button>

    )
}

export default RemoveBtn