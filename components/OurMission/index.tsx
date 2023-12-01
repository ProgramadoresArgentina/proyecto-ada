import Image from "next/image";

export const OurMission = () => {
    return (
        <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 relative mb-28">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-4xl md:mb-20">
                <h2 className="max-w-lg text-4xl  mb-6 font-sans md:text-5xl font-bold leading-none tracking-tight text-white md:mx-auto">
                    Quienes somos?
                </h2>
                <p className="text-base text-white md:text-lg">
                    <a className="hover:text-orange" rel="noreferrer" target="_blank" href="https://www.instagram.com/programadores_argentina/">@programadores_argentina</a> es una comunidad creada en 2018 con el proposito de generar un espacio
                    en común para programadores y personas del mundo IT en Argentina. 
                </p>
            </div>
            <div className="flex max-w-full gap-8 sm:mx-auto items-center flex-col lg:flex-row">
                <div className="flex-[2] flex-col justify-center">
                    <div className="flex">
                        <div className="mr-4">
                            <div className="flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-indigo-50">
                                <svg className="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                                    <polygon stroke-width="3" stroke-linecap="round" strokeLinejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                                </svg>
                            </div>
                        </div>
                        <div className="text-white">
                            <h3 className="mb-2 font-semibold text-2xl degrade-text-orange uppercase">
                                Tu primera experiencia
                            </h3>
                            <p className="text-sm">
                                Si estas buscando tu primer empleo o buscas impulsar tu carrera podes encontrarnos en <a className="text-[#f9a853] mr-1" href="https://www.linkedin.com/company/programadores-argentina">Linkedin</a>
                                 donde compartimos y publicamos trabajos destacados (trainee, relocalizacion, sueldos altos).
                            </p>
                            <hr className="w-full my-6 border-gray-300" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="mr-4">
                            <div className="flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-indigo-50">
                                <svg className="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                                    <polygon stroke-width="3" stroke-linecap="round" strokeLinejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                                </svg>
                            </div>
                        </div>
                        <div className="text-white">
                            <h3 className="mb-2 font-semibold text-2xl degrade-text-orange uppercase">
                                Impulsá tu carrera
                            </h3>
                            <p className="text-sm">
                                Estamos atentos a cursos gratis! Compartimos cursos en nuestro instagram y cupones en linkedin, discord y 
                                en nuestros grupos de whatsapp.
                            </p>
                            <hr className="w-full my-6 border-gray-300" />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="mr-4">
                            <div className="flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-indigo-50">
                                <svg className="w-8 h-8 text-deep-purple-accent-400" stroke="currentColor" viewBox="0 0 52 52">
                                    <polygon stroke-width="3" stroke-linecap="round" strokeLinejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
                                </svg>
                            </div>
                        </div>
                        <div className="text-white">
                            <h3 className="mb-2 font-semibold text-2xl degrade-text-orange uppercase">
                                Bolsa de Talentos
                            </h3>
                            <p className="text-sm">
                                (En desarrollo) Contaremos con una <a className="text-[#f9a853]" href="">Bolsa de talentos</a> donde podrás publicar tu perfil. 
                                Reclutadores y personas en
                                búsqueda de programadores podrán encontrarte allí. Registrate y rellena el formulario para acceder.
                            </p>
                            <hr className="w-full my-6 border-gray-300" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 flex-[2]">
                    <img className="object-cover w-full h-56 col-span-2 rounded shadow-lg" src="/pictures/pic-3.jpg" alt="Nerdearla Programadores Argentina Staff"
                    style={{objectPosition: '0px 36%'}} />
                    <img className="object-cover w-full h-56 col-span-2 rounded shadow-lg" src="/pictures/pic-2.jpg" alt="Staff de programadores argentina en nerdearla"
                    style={{objectPosition: '0px 26%'}} />
                </div>
            </div>
        </div>
    )
};
