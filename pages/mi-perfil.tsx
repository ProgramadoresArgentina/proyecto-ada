import { NextPage } from "next";
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { saveAs } from 'file-saver';
import Image from "next/image";
import { Field, Form, Formik, getIn } from "formik";
import { linkSocials } from "../constants/constants";
import { useSelector } from "react-redux";
import { selectAuthState } from "../store/auth.reducer";
import { wrapper } from "../store/store";
import CustomSelect from '../components/CustomSelect';
import * as yup from "yup";
import { ExperienceOptions, PositionOptions, StateOptions } from "../constants/userDropdowns";
import { launchToast } from "../helpers/launchToast";
import Spinner from "../components/Spinner";


const User: NextPage = () => {
    const [user, setUser] = useState(null);
    const authState = useSelector(selectAuthState);
    const [isLoading, setIsLoading] = useState(true);
    const [url, setUrl] = useState('');

    const FormSchema = yup.object().shape({
        firstName: yup.string()
            .min(3, 'demasiado corto')
            .max(20, 'demasiado largo'),
        lastName: yup.string()
            .min(3, 'demasiado corto')
            .max(20, 'demasiado largo'),
        email: yup.string().email('email inválido').required('campo requerido'),
        url: yup.string()
            .min(3, 'demasiado corto')
            .max(50, 'demasiado largo')
            .required('campo requerido'),
        minidescription: yup.string()
            .max(160, 'demasiado largo'),
        experienceLevel: yup.string()
            .required('campo requerido'),
        status: yup.string()
            .required('campo requerido'),
        position: yup.array()
            .min(1, 'debes elegir al menos 1')
            .max(4, 'puedes elegir hasta 4 posiciones')
            .required('campo requerido'),
    });


    useEffect(() => {
        setIsLoading(true);
        fetch('/api/user')
            .then(response => {
                if (response.status !== 200) throw Error();
                return response.json()
            })
            .then(data => {
                const userData = {
                    username: data.username || '',
                    behance: data.userSettings.behance || '',
                    github: data.userSettings.github || '',
                    linkedin: data.userSettings.linkedin || '',
                    avatar: data.userSettings.avatar || '',
                    minidescription: data.userSettings.minidescription || '',
                    experienceLevel: data.userSettings.experienceLevel,
                    status: data.userSettings.status,
                    position: data.userSettings.position,
                    url: data.userSettings.url,
                    email: data.email,
                }
                setUser(userData);
                setIsLoading(false);
            })
            .catch(error => {
                launchToast("error", "Error al cargar, intentelo nuevamente.");
            });
    }, []);

    const onSubmit = (values) => {
        setIsLoading(true);
        fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status !== 200) throw Error();
                return response.json()
            })
            .then(data => {
                launchToast("success", "Información actualizada correctamente");
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const downloadResume = () => {
        fetch('api/create-pdf')
            .then(response => {
                if (response.status !== 200) throw Error();
                return response.blob()
            })
            .then(blob => {
                launchToast("error", "Descargado");
                saveAs(blob, "hello world.pdf");
            })
            .catch(error => {
                launchToast("error", "No has creado tu primer cv aún");
            });
    }

    if (!user) return <Spinner />
    return (
        <div className="flex justify-center pt-12 pb-0">
            <Formik
                validationSchema={FormSchema}
                initialValues={user}
                onSubmit={(values) => {
                    onSubmit(values);
                }}
                validateOnMount
            >
                {({ errors, isValid, values }) => (
                    <div className="mx-auto mt-16 px-5 sm:w-3/4 lg:px-0 lg:max-w-[80%] sm:mt-20">
                        <Form>
                            <div className="flex justify-center mb-10 flex-col items-center">
                                <Image src={user.avatar} alt="avatar" width={150} height={150} className={`rounded-full mb-5 border-4 ${values.status === 'BUSCANDO' ? 'border-green-400' : values.status === 'MIEMBRO' ? 'border-white' : 'border-violet-400'}`} />
                                <Link href={`/pro/${user.url}`} className="text-blue-400 hover:underline">Ir a mi perfil público</Link>
                                <button type="button" onClick={() => downloadResume()} className="text-blue-400 hover:underline">Descargar cv</button>
                            </div>

                            <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 pb-24">
                                
                                <div className="sm:col-span-2 w-1/2 mb-10">
                                    <label className="block text-sm font-semibold leading-6 text-white">
                                        Situación Laboral
                                        {errors.status ? <span className="lowercase ml-2 text-red-300">({getIn(errors, "status")})</span> : null}
                                    </label>
                                    <div className="mt-2.5">
                                        <Field
                                            className={errors.status && 'dropdown-invalid'}
                                            name="status"
                                            options={StateOptions}
                                            component={CustomSelect}
                                            placeholder="Selecciona tu estado actual"
                                            isMulti={false}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-6 row-gap-10 grid-cols-1">
                                    <div className="lg:py-2 lg:pr-16">
                                        <div className="flex">
                                            <div className="flex flex-col items-center mr-4">
                                                <div>
                                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                                        <svg
                                                            className="w-4 text-gray-600"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <line
                                                                fill="none"
                                                                strokeMiterlimit="10"
                                                                x1="12"
                                                                y1="2"
                                                                x2="12"
                                                                y2="22"
                                                            />
                                                            <polyline
                                                                fill="none"
                                                                strokeMiterlimit="10"
                                                                points="19,15 12,22 5,15"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="w-px h-full bg-gray-300" />
                                            </div>
                                            <div className="pb-8 w-full">
                                                <h1 className="text-white text-3xl mb-8 leading-9">Información basica</h1>
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                                                    <div className="grid grid-cols-1 gap-x-8 gap-y-6">
                                                        <div>
                                                            <label htmlFor="username" className="text-sm font-semibold leading-6 text-white
                                                                flex">
                                                                Nombre de usuario
                                                                {errors.username ? <span className="lowercase ml-2 text-red-300">({getIn(errors, "username")})</span> : null}
                                                            </label>
                                                            <div className="mt-2.5">
                                                                <Field type="text" name="username" id="username" autoComplete="given-name"
                                                                    className={`appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  bg-[#2D3138] ${errors.username && 'border-red-300'}`}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                            <label className="block text-sm font-semibold leading-6 text-white mb-2.5">Redes sociales</label>
                                                            {linkSocials.map(({ id, value, link }) => (
                                                                <div
                                                                    key={id}
                                                                    className="relative mb-4 flex flex-wrap items-stretch rounded-md border">
                                                                    <label
                                                                        htmlFor={value}
                                                                        className="w-[130px] text-gray-100 py-2 px-2 text-right cursor-pointer">
                                                                        {link}
                                                                    </label>
                                                                    <Field
                                                                        id={value}
                                                                        type="text"
                                                                        name={value}
                                                                        className="
                                            relative m-0 block w-[1px] min-w-0 flex-auto shadow appearance-none border rounded-r-sm py-3 px-3 text-white leading-tight focus:outline-none focus:shadow-outline  bg-[#2D3138] text-sm"
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="sm:col-span-2">
                                                            <label htmlFor="url" className="block text-sm font-semibold leading-6 text-white">
                                                                URL Portfolio <small>https://programadoresargentina.com/pro/</small>
                                                                {errors.url ? <span className="lowercase ml-2 text-red-300">({getIn(errors, "url")})</span> : null}
                                                            </label>
                                                            <div className="relative mt-2.5">
                                                                <Field type="text" name="url" id="url"
                                                                    className={`appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  bg-[#2D3138] ${errors.url && 'border-red-300'}`}>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                        <div className="sm:col-span-2">
                                                            <label htmlFor="description" className="block text-sm font-semibold leading-6 text-white">
                                                                Descripción (se usará en la pantalla de talentos)
                                                                {errors.minidescription ? <span className="lowercase ml-2 text-red-300">({getIn(errors, "minidescription")})</span> : null}
                                                            </label>
                                                            <div className="mt-2.5">
                                                                <Field as="textarea" name="minidescription" id="minidescription" rows={4}
                                                                    className={`appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  bg-[#2D3138] ${errors.minidescription && 'border-red-300'}`}
                                                                ></Field>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex flex-col items-center mr-4">
                                                <div>
                                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                                        <svg
                                                            className="w-4 text-gray-600"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <line
                                                                fill="none"
                                                                strokeMiterlimit="10"
                                                                x1="12"
                                                                y1="2"
                                                                x2="12"
                                                                y2="22"
                                                            />
                                                            <polyline
                                                                fill="none"
                                                                strokeMiterlimit="10"
                                                                points="19,15 12,22 5,15"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="w-px h-full bg-gray-300" />
                                            </div>
                                            <div className="pt-1 pb-8 w-full">
                                                <h1 className="text-white text-3xl mb-8 leading-7">Nivel de experiencia</h1>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-semibold leading-6 text-white">
                                                            Nivel de Experiencia
                                                            {errors.experienceLevel ? <span className="lowercase ml-2 text-red-300">({getIn(errors, "experienceLevel")})</span> : null}
                                                        </label>
                                                        <div className="mt-2.5">
                                                            <Field
                                                                className={errors.experienceLevel && 'dropdown-invalid'}
                                                                name="experienceLevel"
                                                                options={ExperienceOptions}
                                                                component={CustomSelect}
                                                                placeholder="Selecciona tu experiencia"
                                                                isMulti={false}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-semibold leading-6 text-white">
                                                            Mis conocimientos en IT
                                                            {errors.position ? <span className="lowercase ml-2 text-red-300">({getIn(errors, "position")})</span> : null}
                                                        </label>
                                                        <div className="mt-2.5">
                                                            <Field
                                                                className={errors.positions && 'dropdown-invalid'}
                                                                name="position"
                                                                options={PositionOptions}
                                                                component={CustomSelect}
                                                                placeholder="Selecciona las posiciones que más se adapten a tu perfíl"
                                                                isMulti={true}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex flex-col items-center mr-4">
                                                <div>
                                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                                        <svg
                                                            className="w-4 text-gray-600"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <line
                                                                fill="none"
                                                                strokeMiterlimit="10"
                                                                x1="12"
                                                                y1="2"
                                                                x2="12"
                                                                y2="22"
                                                            />
                                                            <polyline
                                                                fill="none"
                                                                strokeMiterlimit="10"
                                                                points="19,15 12,22 5,15"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="w-px h-full bg-gray-300" />
                                            </div>
                                            <div className="pt-1 pb-8 w-full text-white">
                                                <h1 className="text-3xl mb-8 leading-7">Completar información</h1>
                                                <p>Crea tu primer CV para aparecer en la bolsa de talentos.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>


                        <div className="sticky bottom-0 left-0 z-10 w-full px-32 py-10">
                            <div className="flex justify-end">
                                <button type="submit"
                                    disabled={!isValid || isLoading}
                                    className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 plain-button">
                                    {
                                        !isLoading ? 'Guardar Información' : 'Guardando..'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    )
}



export default withPageAuthRequired(wrapper.withRedux(User), {
    returnTo: '/user'
});
