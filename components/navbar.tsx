import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import hamburgerIcon from '../public/hamburger.png';
import Logo from '../public/LogoProgramadoresArgentina.png';
import { TypeAnimation } from 'react-type-animation';


const navRoutes = [
    // { name: "Proyectos", path: "/" },
    { name: "Blog", path: "/blog" },
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
        <div className='px-4 px-12 bg-white z-10 relative z-20'>
            <div className='flex items-center justify-between'>

                {/* Logo */}
                <div className="flex items-center min-h-[80px]">
                    <Link href="/">
                        <Image src={Logo} alt='Programadores Argentina' height={40}/>
                    </Link>
                    <div className="hidden md:flex items-center">
                        <div className="border-r-2 h-[40px] color-gray mx-4 rounded">
                        </div>
                        <div className="text-[12px] ml-3 font-[500]">
                            <TypeAnimation
                            sequence={[
                                'BÚSQUEDA DE TALENTOS',
                                3000,
                                'LEER Y APRENDER',
                                3000,
                                'COMPARTIR',
                                3000
                            ]}
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                            className="text-indigo-800 tracking-[2px] font-roboto font-bold"
                            />
                        </div>
                    </div>
                </div>

                {/* hamburger menu hidden */}
                <div onClick={() => setOpen(!open)} className='flex  align-middle items-center  absolute right-8 cursor-pointer lg:hidden'>
                    <Image src={hamburgerIcon} alt='menu' width={30} height={30} />
                </div>

                {/* routes */}
                <ul className={`lg:flex gap-3 md:items-center p-4 absolute lg:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all ${open ? 'top-[80px]' : 'top-[-490px]'}`}>
                    {
                        navRoutes.map((link: Link, index: number) => (
                            <li key={index} className={`font-jost text-[0.8rem] text-gray-800 uppercase ${open ? 'ml-0 mt-4' : 'ml-6'}`}>
                                <Link href={link.path}>{link.name}</Link>
                            </li>
                        ))
                    }
                    <div className={`plain-button ${open ? 'ml-0 mt-4' : 'ml-6'}`}>
                        <Link href="/generarcv">Generar mi CV</Link>
                    </div>
                </ul>
            </div>
        </div >
    )
}
export default Navbar;