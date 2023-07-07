import Link from 'next/link'
import React, { useState } from 'react'
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
    },
    {
        name: 'Alexis Aguero',
        url: 'https://github.com/AlexisAguero',
        role: 'QA Tester',
        imageUrl: '/staff/Avatar-AlexisAguero.jpg',
    }
]

export default function StaffSection() {
    const [showAll, setShowAll] = useState(false);
    const displayedPeople = showAll ? people : people.slice(0, 4);

    return (

        <div className="bg-[#0d1117] pt-10 pb-36">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Conoce a nuestro <span className='degrade-text'>equipo</span></h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        La comunidad no sería posible sin ellos. 
                    </p>
                </div>
                <ul role="list" className="grid gap-x-8 gap-y-5 sm:grid-cols-2 sm:gap-y-5 xl:col-span-2">
                    {displayedPeople.map((person) => (
                        <li key={person.name} className="bg-[#161B22] p-10 rounded-md shadow-md">
                            <div className="flex items-center gap-x-6">
                                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                                <div>
                                    <a target="_blank" href={person.url} rel="noreferrer" className="text-base font-semibold leading-7 tracking-tight text-white hover:underline">{person.name}</a>
                                    <p className="text-sm font-semibold leading-6 text-[#F78001]">{person.role}</p>
                                </div>
                            </div>
                        </li>
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
