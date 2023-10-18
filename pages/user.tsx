import { NextPage } from "next";
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { saveAs } from 'file-saver';


const User: NextPage = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) return <div className="flex justify-center" >Loading...</div>;
    if (!user) return <div className="flex justify-center" >You are not logged in</div>

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/auth/session')
          .then(response => response.json())
          .then(data => {
            setUser(data);
            setIsLoading(false);
        })
          .catch(error => {
            console.log(error);
        });
    }, [])

    const downloadResume = () => {
        fetch('api/create-pdf')
            .then(response => response.blob())
            .then(blob => {
                saveAs(blob, "hello world.pdf");
            })
            .catch(error => {
                // Manejo de errores
            });
    }

    return (
        user && (
            <div className="flex justify-center pt-12 pb-24">
                <form action="#" method="POST" className="mx-auto mt-16 max-w-3xl w-1/3 sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-white">First name</label>
                            <div className="mt-2.5">
                                <input type="text" name="first-name" id="first-name" autoComplete="given-name" 
                                className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  bg-[#2D3138]"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-white">Last name</label>
                            <div className="mt-2.5">
                                <input type="text" name="last-name" id="last-name" autoComplete="family-name" 
                                className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  bg-[#2D3138]"
                                 />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold leading-6 text-white">Experiencia</label>
                            <div className="mt-2.5">
                                <select id="experience" name="experience"
                                className="mt-2 block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  bg-[#2D3138]">
                                    <option value="trainee">Trainee (Sin experiencia)</option>
                                    <option value="junior">Junior</option>
                                    <option value="semi-senior">Semi Senior</option>
                                    <option value="senior">Senior</option>
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold leading-6 text-white">Estado</label>
                            <div className="mt-2.5">
                                <select id="state" name="state"
                                className="mt-2 block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  bg-[#2D3138]">
                                    <option value="close-to-work">No estoy buscando trabajo</option>
                                    <option value="open-to-work">Buscando trabajo</option>
                                    <option value="recruiter">Reclutador</option>
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-white">Last name</label>
                            <div className="mt-2.5">
                                <input type="text" name="last-name" id="last-name" autoComplete="family-name" 
                                className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  bg-[#2D3138]"
                                 />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-white">URL Portfolio</label>
                            <div className="relative mt-2.5">
                                <div className="absolute inset-y-0 flex items-center left-2 text-white">
                                    <label className="text-xs">https://programadoresargentina.com/pro/</label>
                                </div>
                                <input type="tel" name="phone-number" id="phone-number" autoComplete="tel" 
                                className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  bg-[#2D3138]" />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white">Message</label>
                            <div className="mt-2.5">
                                <textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Let's talk</button>
                    </div>
                </form>
            </div>
        )
    );
}

export default User;

//this creates /user  //to show logged user data