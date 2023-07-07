import { MouseEventHandler } from "react";
interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
    label: string;
}
const AddBtn: React.FC<Props> = ({ onClick, label }) => {
    return (
        <button
            type="button"
            className="rounded w-48 h-10 content-center justify-center bg-gray-700"
            onClick={onClick}
        >
            <p className="text-white text-xs font-normal">{label}</p>
        </button>
    )
}

export default AddBtn