import { MouseEventHandler } from "react";
interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
    label: string;
}
const AddBtn: React.FC<Props> = ({ onClick, label }) => {
    return (
        <button
            className="bg-shadeBlue  rounded w-48 h-10 content-center justify-center"
            onClick={onClick}
            type="button"
        >
            <p className="text-white text-xs font-normal">{label}</p>
        </button>
    )
}

export default AddBtn