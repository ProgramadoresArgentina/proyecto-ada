
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    let [open, setOpen] = useState(false);
    return (
        <div className='flex justify-between items-center shadow-md w-full p-4'  >
            <Link href="">LOGO</Link>
            <div className='flex justify-end items-center'>
                <Link href="" className='ml-11 font-normal'>Proyectos</Link>
                <Link href="" className='ml-11 font-normal'>Bolsa de talentos</Link>
                <Link href="" className='ml-11 font-normal'>Contacto</Link>
                <Link href="" className='ml-11 font-normal'>Nosotros</Link>
                <button className="bg-indigo-500 text-sm text-white rounded-lg  py-2 px-4  ml-11">
                    Generar mi CV
                </button>
            </div>
        </div>
    )
}
export default Navbar;