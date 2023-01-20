
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import hamburgerIcon from '../public/hamburger.png';
import Logo from '../public/LogoProgramadoresArgentina.png';
const Navbar = () => {
    let [open, setOpen] = useState(false);
    return (
        <div className='w-full sticky p-4'  >
            <div className='md:flex items-center justify-between'>

                {/* Logo */}
                <Link href="">
                    <Image src={Logo} alt='Programadores Argentina'
                    />
                </Link>

                {/* hamburger menu hidden */}
                <div onClick={() => setOpen(!open)} className='flex  align-middle items-center  absolute right-8 top-6 cursor-pointer md:hidden'>
                    <Image src={hamburgerIcon} alt='menu'
                        width={30}
                        height={30}
                    />
                </div>

                {/* links */}
                <ul className={`md:flex md:items-center p-4 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20' : 'top-[-490px]'}`}>
                    <li className={`font-normal ${open ? 'ml-0 mt-4' : 'ml-6'}`}><a href="/">Proyectos</a></li>
                    <li className={`font-normal ${open ? 'ml-0 mt-4' : 'ml-6'}`}><a href="/">Bolsa de talentos</a></li>
                    <li className={`font-normal ${open ? 'ml-0 mt-4' : 'ml-6'}`}><a href="/">Contacto</a></li>
                    <li className={`font-normal ${open ? 'ml-0 mt-4' : 'ml-6'}`}><a href="/">Nosotros</a></li>
                    <button className={`font-normal bg-indigo-500 text-sm text-white rounded-lg  py-2 px-4 ${open ? 'ml-0 mt-4' : 'ml-6'}`}>
                        <a href="/">Generar mi CV</a>
                    </button>
                </ul>
            </div>
        </div >
    )
}
export default Navbar;