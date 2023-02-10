import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import hamburgerIcon from '../public/hamburger.png';
import Logo from '../public/LogoProgramadoresArgentina.png';


const navRoutes = [
    { name: "Proyectos", path: "/" },
    { name: "Bolsa de Talentos", path: "/" },
    { name: "Contacto", path: "/" },
    { name: "Nosotros", path: "/" },
];

const Navbar: React.FC = () => {
    type Link = {
        name: string
        path: string
    }
    let [open, setOpen] = useState(false);
    return (
        <div className='max-w-screen-2xl p-4 bg-white z-10 mx-1 relative'>
            <div className='md:flex items-center justify-between'>

                {/* Logo */}
                <Link href="/">
                    <Image src={Logo} alt='Programadores Argentina' height={60}/>
                </Link>

                {/* hamburger menu hidden */}
                <div onClick={() => setOpen(!open)} className='flex  align-middle items-center  absolute right-8 top-6 cursor-pointer md:hidden'>
                    <Image src={hamburgerIcon} alt='menu' width={30} height={30} />
                </div>

                {/* routes */}
                <ul className={`md:flex md:items-center p-4 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20' : 'top-[-490px]'}`}>
                    {
                        navRoutes.map((link: Link, index: number) => (
                            <li key={index} className={`font-normal ${open ? 'ml-0 mt-4' : 'ml-6'}`}>
                                <Link href={link.path}>{link.name}</Link>
                            </li>
                        ))
                    }
                    <button className={`font-normal bg-indigo-500 text-sm text-white rounded-lg  py-2 px-4 ${open ? 'ml-0 mt-4' : 'ml-6'}`}>
                        <Link href="/">Generar mi CV</Link>
                    </button>
                </ul>
            </div>
        </div >
    )
}
export default Navbar;