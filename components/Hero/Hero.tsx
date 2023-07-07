import Link from "next/link";
import scrollImage from '../../public/scroll-down.gif';

const links = [
    { name: 'Bolsa de Talentos', href: '/talentos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Posiciones abiertas', href: 'https://www.linkedin.com/company/programadores-argentina/' },
    { name: 'Becas y Cursos', href: 'https://linktr.ee/ProgramadoresArgentina' },
]

export default function Hero() {
    return (
        <div className="relative isolate  min-h-screen overflow-hidden pb-40 pt-44 bg-[#1B1F24]"
        style={{'background': 'linear-gradient(180deg, #08081F 0%, rgba(13,17,23,1) 100%'}}>\
            <div className='bg-[#F7850B] absolute top-20 w-full'>
                <div className="w-1/2 text-center m-auto py-2">
                    <p className="text-white font-manrope">Sorteo de beca clickeando <a className="plain-button px-1 py-1 text-sm rounded-sm">AQUÍ</a>. Finaliza el domingo</p>
                </div>
            </div>
            {/* <img
                src="https://github.githubassets.com/images/modules/site/heroes/features-hero-code-review.svg"
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-contain object-right md:object-center top-11"
            /> */}
            <img
                src="https://i.ibb.co/bsWBX7L/star-bg-1.png"
                alt=""
                className="absolute top-0 -z-10 h-full w-full object-cover object-right md:object-center"
            />
            {/* <img
                src="https://i.ibb.co/r61MLCP/Auto-Layout-Horizontal.png"
                alt=""
                className="absolute -z-10 h-full w-full object-contain object-right md:object-center -bottom-32"
            /> */}

            
            <div className="mx-auto text-center px-6 lg:px-8">
                <div className="max-w-5xl m-auto">
                    <h2 className="text-[4rem] font-bold tracking-tight text-white"><span className="degrade-text-orange">Comunidad</span> Programadores Argentina</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        ESPACIO PARA PROGRAMADORES Y PERSONAS DEL MUNDO IT⚡️
                    </p>
                </div>
                <div className="mx-auto mt-10 max-w-2xl ">
                    <div className="flex justify-between items-center">
                        {links.map((link) => (
                            <a key={link.name} href={link.href} target="_blank" rel="noreferrer" className="flex text-white hover:underline cursor-pointer">
                                {link.name} <span aria-hidden="true">&rarr;</span>
                            </a>
                        ))}
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col-reverse">
                            <dt className="text-base leading-7 text-[#9773ff]">Miembros en <Link className="hover:text-[#673FD7]" href="https://www.linkedin.com/company/programadores-argentina">LinkedIn</Link></dt>
                            <dd className="text-2xl font-bold leading-9 tracking-tight text-white">21.8K</dd>
                        </div>
                        <div className="flex flex-col-reverse">
                            <dt className="text-base leading-7 text-[#9773ff]">Miembros en <Link className="hover:text-[#673FD7]" href="https://www.instagram.com/programadores_argentina/">Instagram</Link></dt>
                            <dd className="text-2xl font-bold leading-9 tracking-tight text-white">21.5K</dd>
                        </div>
                        <div className="flex flex-col-reverse">
                            <dt className="text-base leading-7 text-[#9773ff]">Miembros en <Link className="hover:text-[#673FD7]" href="https://linktr.ee/ProgramadoresArgentina">Grupos</Link></dt>
                            <dd className="text-2xl font-bold leading-9 tracking-tight text-white">1.2K</dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="absolute w-full bottom-10">
                <div className="flex justify-center">
                            <img src="https://i0.wp.com/rambutgelap.com/wp-content/uploads/2022/07/scroll-down-mouse.gif?ssl=1"
                            style={{width: 50}} />
                </div>
            </div>
        </div>
    )
}