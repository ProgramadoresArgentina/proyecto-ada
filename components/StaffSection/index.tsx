import React, { useState } from 'react';
import { motion } from "framer-motion"
import Image from 'next/image';
import { staff } from '../../data/staff-data';

export default function StaffSection() {
    const [showAll, setShowAll] = useState(false);
    const displayedPeople = showAll ? staff : staff.slice(0, 8);

    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 relative">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-4xl md:mb-12">
                <h2 className="max-w-lg text-4xl  mb-6 font-sans md:text-5xl font-bold leading-none tracking-tight text-white md:mx-auto">
                    Nuestro equipo
                </h2>
                <p className="text-base text-white md:text-lg">
                    Fundadores, administradores, desarrolladores destacados. Todos ayudan a que la comunidad continúe y crezca.
                </p>
            </div>
            <div className="grid gap-10 mx-auto lg:max-w-screen-lg grid-cols-2 lg:grid-cols-4">
                {
                    displayedPeople.map((person, i) => (
                        <div className="flex flex-col items-center" key={i}>
                            <Image
                                className="object-cover w-20 h-20 mb-2 rounded-full shadow"
                                src={person.imgUrl}
                                alt={person.name}
                                width={100} height={100}
                            />
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold text-slate-300">{person.name}</p>
                                <p className="text-sm text-white text-center">{person.position}</p>
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

}
