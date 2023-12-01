import Link from 'next/link'
import React from 'react'
import { ContactSection } from '../components/Contact/ContactSection'
import Head from 'next/head'

const faq = () => {
    return (
      <>
            <Head>
                <title>Programadores Argentina - Preguntas frecuentes</title>
            </Head>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-orange uppercase rounded-full bg-teal-accent-400">
                    Preguntas frecuentes
                </p>
                </div>
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
                La Comunidad
                </h2>
                <p className="text-base text-gray-400 md:text-lg">
                Brindamos un espacio para personas del mundo IT en Argentina. 
                </p>
            </div>
            </div>
            <div className="max-w-screen-xl sm:mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 row-gap-8 lg:grid-cols-2">
                <div>
                    <p className="mb-4 text-xl font-medium degrade-text">
                    Brindan servicios de desarrollo de software?
                    </p>
                    <p className="text-white">
                    No, pero contamos con personas que te podemos recomendar. Estamos
                    trabajando en una bolsa de talentos en nuestra plataforma.
                    </p>
                </div>
                
                <div>
                    <p className="mb-4 text-xl font-medium degrade-text">
                    Como puedo iniciar en la programación?
                    </p>
                    <p className="text-white">
                    Tenemos varios posts de instagram nombrando plataformas en donde iniciar en el mundo
                    de la programación u otras carreras IT.
                    </p>
                </div>
                
                <div>
                    <p className="mb-4 text-xl font-medium degrade-text">
                    Dan cursos o formación?
                    </p>
                    <p className="text-white">
                    No, solemos compartir cursos que se abren durante el año, y como inscribirse en nuestro instagram. 
                    La comunidad comparte cupones de cursos en telegram. <Link className="hover:text-[#673FD7]" href="https://linktr.ee/ProgramadoresArgentina"><u>Link</u></Link>
                    </p>
                </div>
                
                <div>
                    <p className="mb-4 text-xl font-medium degrade-text">
                    Como puedo aportar a la comunidad?
                    </p>
                    <p className="text-white">
                        <Link className="hover:text-[#673FD7]" href="/#contact"><u>Comunicate</u></Link> con los administradores de la comunidad 
                        si te gustaría hacer un aporte o compartír una idea.
                    </p>
                </div>
                
                <div>
                    <p className="mb-4 text-xl font-medium degrade-text">
                    Proximas implementaciones:
                    </p>
                    <ul className="text-white ">
                        <li>- Generador de CV con plantillas gratis</li>
                        <li>- Bolsa de talentos (buscar y encontrar trabajo)</li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
        <div className="mt-10">
            <ContactSection />
        </div>
      </>
    )
}
export default faq