import Link from 'next/link'
import React, { useState } from 'react';
import { motion } from "framer-motion"
const people = [
    {
        name: 'Juanse Mastrangelo',
        url: 'https://instagram.com/juansemastrangelo',
        role: 'Co-Founder',
        imageUrl: '/staff/Avatar-JuanseMastrangelo.png',
    },
    {
        name: 'Gonzalo Martinese',
        url: 'https://github.com/DevMartinese',
        role: 'Co-Founder',
        imageUrl: '/staff/Avatar-GonzaloMartinese.jpg',
    },
    {
        name: 'Neri Heredia',
        url: 'https://github.com/neriheredia',
        role: 'Administrador',
        imageUrl: '/staff/Avatar-NeriHeredia.jpg',
    },
    {
        name: 'Ian Rosales',
        url: 'https://github.com/sampxcs',
        role: 'Full-stack Developer',
        imageUrl: '/staff/Avatar-IanRosales.jpg',
    },
    {
        name: 'Carolina Riddick',
        url: 'https://github.com/Carolina-Riddick',
        role: 'Full-stack Developer',
        imageUrl: '/staff/Avatar-CarolinaRiddick.jpg',
    },
    {
        name: 'Elam Cano',
        url: 'https://github.com/ElamCano',
        role: 'Full-stack Developer',
        imageUrl: '/staff/Avatar-ElamCano.jpg',
    },
    {
        name: 'Nico Sammaritano',
        url: 'https://github.com/Nicolius888',
        role: 'Full-stack Developer',
        imageUrl: '/staff/Avatar-NicoSammaritano.jpg',
    },
    {
        name: 'Nicolas Smael',
        url: 'https://github.com/SmaelNicolas',
        role: 'Full-stack Developer',
        imageUrl: '/staff/Avatar-SmaelNicolas.jpg',
    },
    {
        name: 'Daniela Martinez',
        url: 'https://github.com/DanMartinez01',
        role: 'Full-stack Developer',
        imageUrl: '/staff/Avatar-DanielaMartinez.jpg',
    },
    {
        name: 'Manuel Badell',
        url: 'https://github.com/ManuelBadellCartasso',
        role: 'QA Tester',
        imageUrl: '/staff/Avatar-ManuelBadell.jpg',
    }
]

export default function StaffSection() {
    const [showAll, setShowAll] = useState(false);
    const displayedPeople = showAll ? people : people.slice(0, 8);

    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 relative">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-4xl md:mb-12">
                <h2 className="max-w-lg sm:text-4xl  mb-6 font-sans md:text-5xl font-bold leading-none tracking-tight text-white md:mx-auto">
                    Nuestro equipo
                </h2>
                <p className="text-base text-white md:text-lg">
                    Fundadores, administradores, desarrolladores destacados. Todos ayudan a que la comunidad continúe y crezca.
                </p>
            </div>
            <div className="grid gap-10 mx-auto lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-4">
                {
                    displayedPeople.map((person, i) => (
                        <div className="flex flex-col items-center" key={i}>
                            <img
                                className="object-cover w-20 h-20 mb-2 rounded-full shadow"
                                src={person.imageUrl}
                                alt={person.name}
                            />
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold text-slate-300">{person.name}</p>
                                <p className="text-sm text-white">{person.role}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                !showAll &&
                <div className="text-center mt-9" onClick={() => setShowAll(true)}>
                    <button className="hover:underline text-white">Mostrar más</button>
                </div>
            }
        </div>
    )
    return (

        <div className="pt-10 pb-20 relative">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <motion.div
                    transition={{ duration: 1 }}
                    initial={{ x: -50 }}
                    animate={{ x: 0 }}>
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Conoce a nuestro <span className='degrade-text'>equipo</span></h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            La comunidad no sería posible sin ellos.
                        </p>
                    </div>
                </motion.div>
                <ul role="list" className="grid gap-x-8 gap-y-5 sm:grid-cols-2 sm:gap-y-5 xl:col-span-2">
                    {displayedPeople.map((person) => (
                        <motion.div
                            key={person.name}
                            transition={{ duration: 2 }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}>
                            <li className="bg-[#161B22] p-10 rounded-md shadow-md">
                                <div className="flex items-center gap-x-6">
                                    <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                                    <div>
                                        <a target="_blank" href={person.url} rel="noreferrer" className="text-base font-semibold leading-7 tracking-tight text-white hover:underline">{person.name}</a>
                                        <p className="text-sm font-semibold leading-6 text-[#F78001]">{person.role}</p>
                                    </div>
                                </div>
                            </li>
                        </motion.div>
                    ))}
                    {
                        !showAll &&
                        <div className="text-center" onClick={() => setShowAll(true)}>
                            <button className="hover:underline text-white">Mostrar más</button>
                        </div>
                    }
                </ul>
            </div>
        </div>
    )
}
