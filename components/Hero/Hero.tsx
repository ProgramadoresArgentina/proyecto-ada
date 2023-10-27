import Link from "next/link";
import scrollImage from '../../public/scroll-down.gif';
import BackgroundStars from "../../public/star-bg.png";
import ActiveEvents from "../ActiveEvents";
import Image from "next/image";
import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import CountUp from 'react-countup';
import { motion } from "framer-motion"

const links = [
    { name: 'Bolsa de Talentos', href: '/talentos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Posiciones abiertas', href: 'https://www.linkedin.com/company/programadores-argentina/' },
    { name: 'Becas y Cursos', href: 'https://linktr.ee/ProgramadoresArgentina' },
]

export default function Hero() {
    
    return (
        <div className="relative isolate  min-h-screen overflow-hidden pb-40 pt-16 md:pt-32 bg-[#1B1F24]"
        style={{'background': 'linear-gradient(180deg, #08081F 0%, rgba(13,17,23,1) 100%'}}>
            <div className='bg-[transparent] absolute top-20 w-full'>
                <div className="w-full text-center m-auto">
                    <ActiveEvents/>
                </div>
            </div>
            {/* <img
                src="https://github.githubassets.com/images/modules/site/heroes/features-hero-code-review.svg"
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-contain object-right md:object-center top-11"
            /> */}
            <Image
                src={BackgroundStars}
                alt=""
                className="fixed top-0 -z-10 h-full w-full object-cover object-right md:object-center"
            />
            {/* <img
                src="https://i.ibb.co/r61MLCP/Auto-Layout-Horizontal.png"
                alt=""
                className="absolute -z-10 h-full w-full object-contain object-right md:object-center -bottom-32"
            /> */}

            
            <div className="mx-auto text-center px-6 lg:px-8">
                <div className="mx-auto max-w-2xl mt-2">
                    <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col-reverse">
                            <dt className="text-base leading-7 text-[#9773ff]">Miembros en <Link className="hover:text-[#673FD7]" href="https://www.linkedin.com/company/programadores-argentina">LinkedIn</Link></dt>
                            <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                                <CountUp 
                                start={0}
                                end={29000}
                                duration={2.7} />
                            </dd>
                        </div>
                        <div className="flex flex-col-reverse">
                            <dt className="text-base leading-7 text-[#9773ff]">Miembros en <Link className="hover:text-[#673FD7]" href="https://www.instagram.com/programadores_argentina/">Instagram</Link></dt>
                            <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                                <CountUp 
                                start={0}
                                end={24300}
                                duration={2.4} />
                            </dd>
                        </div>
                        <div className="flex flex-col-reverse">
                            <dt className="text-base leading-7 text-[#9773ff]">Miembros en <Link className="hover:text-[#673FD7]" href="https://linktr.ee/ProgramadoresArgentina">Grupos</Link></dt>
                            <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                                <CountUp 
                                    start={0}
                                    end={21150}
                                    duration={1.7} />
                                </dd>
                        </div>
                    </dl>
                </div>
                <div className="max-w-5xl m-auto mt-5">
                    <h2 className="text-[3rem] md:text-[4rem] font-bold tracking-tight text-white"><span className="degrade-text-orange">Comunidad</span> Programadores Argentina</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">ESPACIO PARA PROGRAMADORES Y PERSONAS DEL MUNDO IT⚡️    
                    </p>
                </div>
                <div className="hero-buttons">
                    <div className="mt-20 mx-auto grid max-w-5xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
                        <div role="list" className="grid gap-x-8 gap-y-5 sm:grid-cols-2 sm:gap-y-5 xl:col-span-2">
                            <motion.div
                                style={{width: "100%"}}
                                transition={{duration: 2}}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}>
                                <li className="bg-[#161B22] p-10 rounded-md shadow-md">
                                    <div className="flex items-center gap-x-6">
                                        <div>
                                            <a target="_blank" href="" rel="noreferrer" className="font-semibold leading-7 tracking-tight degrade-text
                                            uppercase text-xl flex items-center justify-center">
                                                <UserIcon className="h-6 mr-2 text-white" />Soy Programador
                                            </a>
                                            <p className="text-sm font-semibold leading-6 text-white px-5">Si estas buscando tu primera experiencia o trabajo libremente.</p>
                                        </div>
                                    </div>
                                </li>
                            </motion.div>

                            <motion.div
                                style={{width: "100%"}}
                                transition={{duration: 2}}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}>
                                <li className="bg-[#161B22] p-10 rounded-md shadow-md">
                                    <div className="flex items-center gap-x-6">
                                        <div>
                                            <a target="_blank" href="" rel="noreferrer" className="font-semibold leading-7 tracking-tight degrade-text-orange
                                            uppercase text-xl flex items-center justify-center">
                                                <MagnifyingGlassIcon className="h-6 mr-2 text-white" /> Busco Talento
                                            </a>
                                            <p className="text-sm font-semibold leading-6 text-white px-5">Si estas buscando programador o profesional relacionado al mundo IT</p>
                                        </div>
                                    </div>
                                </li>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute w-full bottom-24">
                <div className="flex justify-center">
                            <Image src="https://i0.wp.com/rambutgelap.com/wp-content/uploads/2022/07/scroll-down-mouse.gif?ssl=1" alt=""
                            width={50}
                            height={100} />
                </div>
            </div>
        </div>
    )
}