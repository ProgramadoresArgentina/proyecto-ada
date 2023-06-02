import { MouseEventHandler } from "react";
import Image from 'next/image';
import eye from '../../public/form/eye.png';
interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const DownloadBtn: React.FC<Props> = ({ onClick }) => {
    return (
        <button
            type="button"
            className="bg-shadeBlue  
            rounded w-50 h-12 content-center justify-center px-2 
            absolute z-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            onClick={onClick}
        >
            <p className=" flex flex-inline text-white text-xs font-normal mx-1">
                <span className='mx-1'>
                    <Image
                        src={eye}
                        alt="eye"
                    />
                </span>
                Descargar ejemplo
            </p>
        </button>
    )
}

export default DownloadBtn