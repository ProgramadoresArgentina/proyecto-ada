import { Formik, Field, Form, ErrorMessage, FieldArray, getIn } from 'formik';
import { basicSchema, initialExperience, initialEducation, initialCerticate } from '../../schemas/basicSchema';
import AddBtn from './AddBtn';
import RemoveBtn from './RemoveBtn';
import { saveAs } from 'file-saver';
import { useState } from 'react';

const FormLayout: React.FC<{}> = () => {
    const [stepNo, setStepNo] = useState(1);
    const steps = ['Personal', 'Educación', 'Certificados', 'Experiencia', 'Descargar']

    interface MyFormValues {
        basic: [{
            name: string;
            position: string;
            email: string;
            linkedIn: string;
            portfolio: string;
            github: string;

        }],
        experiences: [{
            title: string;
            company: string;
            dateSince: string;
            dateTo: string;
            place: string;
            description: string;
            currently: boolean;
        }],
        education: [{
            degree: string;
            university: string;
            dateSince: string;
            dateTo: string;
            currently: boolean;
            place: string;
            description: string;
        }],
        certificates: [{
            degree: string;
            university: string;
            dateSince: string;
            dateTo: string;
            currently: boolean;
            linkId: any;
            description: string;
        }]
    }
    const initialValues: MyFormValues = {
        basic: [{
            name: "",
            position: "",
            email: "",
            portfolio: "",
            linkedIn: "",
            github: "",
        }],
        education: [{
            degree: "",
            university: "",
            dateSince: "",
            dateTo: "",
            currently: false,
            place: "",
            description: ""
        }],
        certificates: [{
            degree: "",
            university: "",
            dateSince: "",
            dateTo: "",
            currently: false,
            linkId: "",
            description: ""
        }],
        experiences: [{
            title: "",
            company: "",
            dateSince: "",
            dateTo: "",
            currently: false,
            place: "",
            description: "",
        }],
    }

    const onSubmit = (values, actions) => {
        fetch('api/create-pdf',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => response.blob())
        .then(blob => {
            saveAs(blob, "hello world.pdf");
            // actions.resetForm();
        })
        .catch(error => {
          // Manejo de errores
          console.error(error);
        });
    }

    const onClickNext = (errors) => {
        console.log(errors);
        if(stepNo !== steps.length) { // If is not the last page
            setStepNo(stepNo + 1);
            scrollToTop();
        }
    }

    const onClickPrev = () => {
        if(stepNo > 1) { // If is not the first page
            setStepNo(stepNo - 1);
            setTimeout(() => {
                
            scrollToTop();
            }, 100);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                onSubmit(values, actions);
            }}
            validationSchema={basicSchema}
            validateOnMount
        >
            {({ values, errors, touched }) => {
                return (
                    <Form className="w-full font-ibm text-textGrey z-10 bg-[#161B22] p-10 rounded-md shadow-md">
                        <ol className="mb-10 flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                            {
                                steps.map((step, i) => (
                                    <li key={i} className={`flex items-center ${((i+1) === stepNo) && "text-[#F78001] "}
                                     ${((i+1) !== steps.length) && "after:hidden md:w-full sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1"}`}>
                                        <span className={`${(steps.length !== (i+1)) ? "flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500":"mr-2 flex font-roboto"}`}>
                                            {
                                                (i+1) === stepNo ?
                                                <svg aria-hidden="true" className="w-4 h-4 mr-2 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                :
                                                <span className="mr-2">{i+1}</span>
                                            }
                                            {step}
                                        </span>
                                    </li>
                                ))
                            }
                        </ol>

                        <div>
                            {/* STEP 1 - Personal */}
                            <div>
                                {
                                    stepNo === 1 &&
                                    (
                                        <FieldArray name="basic">
                                        {() => (
                                            <div>
                                                {values.basic.length > 0 &&
                                                    values.basic.map((basic, index) => (
                                                        <div key={index} className="flex flex-wrap -mx-3 mb-6 gap-y-2">
                                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                <label className="text-white">
                                                                    Nombre Completo *
                                                                </label>
                                                                <Field
                                                                    className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                    name={`basic.${index}.name`}
                                                                    placeholder="Programadores Argentina"
                                                                    type="text"
                                                                    id={getIn(errors, `basic.${index}.name`) && getIn(touched, `basic.${index}.name`) && 'invalid'}
                                                                />
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                <label className=' flex whitespace-nowrap text-white'>
                                                                    Posición actual/buscada  *
                                                                </label>
                                                                <Field
                                                                    className="mt-2 appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                    name={`basic.${index}.position`}
                                                                    placeholder="Desarrollador de Software Junior"
                                                                    type="text"
                                                                    id={getIn(errors, `basic.${index}.position`) && getIn(touched, `basic.${index}.position`) && 'invalid'}
                                                                />
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                <label className="text-white">
                                                                    Email *
                                                                </label>
                                                                <Field
                                                                    className="mt-2 appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                    name={`basic.${index}.email`}
                                                                    placeholder="programadoresargentina@gmail.com"
                                                                    type="email"
                                                                    id={getIn(errors, `basic.${index}.email`) && getIn(touched, `basic.${index}.email`) && 'invalid'}
                                                                />
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                <label className="text-white">
                                                                    Sitio web/Portfolio
                                                                </label>
                                                                <Field
                                                                    className="mt-2 appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                    name={`basic.${index}.portfolio`}
                                                                    placeholder="programadoresargentina.com"
                                                                    type="text"
                                                                    id={getIn(errors, `basic.${index}.portfolio`) && getIn(touched, `basic.${index}.portfolio`) && 'invalid'}
                                                                />
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                <label className="text-white">
                                                                    Linkedin user
                                                                </label>
                                                                <Field
                                                                    className="mt-2 appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                    name={`basic.${index}.linkedIn`}
                                                                    placeholder="linkedin.com/programadoresargentina"
                                                                    type="text"
                                                                    id={getIn(errors, `basic.${index}.linkedIn`) && getIn(touched, `basic.${index}.linkedIn`) && 'invalid'}
                                                                />
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                <label className="text-white">
                                                                    Github user
                                                                </label>
                                                                <Field
                                                                    className="mt-2 appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                    name={`basic.${index}.github`}
                                                                    placeholder="github.com/ProgramadoresArgentina"
                                                                    type="text"
                                                                    id={getIn(errors, `basic.${index}.github`) && getIn(touched, `basic.${index}.github`) && 'invalid'}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                        </FieldArray>
                                    )
                                }
                            </div>


                            {/* STEP 2 - Education */}
                            <div>
                                {
                                    stepNo === 2 &&
                                    (
                                        <FieldArray name="education">
                                            {({ insert, remove, push }) => (
                                                <div>
                                                    {values.education.length > 0 &&
                                                        values.education.map((education, index) => (
                                                            <div key={index} className={`${values.education.length > 1 && 'border-b mb-5 border-zinc-600'}`}>
                                                                {
                                                                    values.education.length > 1 &&
                                                                    <div className="flex flex-wrap justify-end">
                                                                        <RemoveBtn
                                                                            onClick={() => remove(index)}
                                                                        />
                                                                    </div>
                                                                }
                                                                <div className="flex flex-wrap -mx-3 mb-6">
                                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                        <label className="text-white" htmlFor ={`education.${index}.degree`}>Titulo  *</label>
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                            name={`education.${index}.degree`}
                                                                            placeholder="Analista en sistemas"
                                                                            type="text"
                                                                            id={getIn(errors, `education.${index}.degree`) && getIn(touched, `education.${index}.degree`) && 'invalid'}
                                                                        />
                                                                    </div>
                                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                        <label className="text-white" htmlFor ={`education.${index}.university`}>Universidad  *</label>
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                            name={`education.${index}.university`}
                                                                            placeholder="Univesidad de Buenos Aires"
                                                                            type="text"
                                                                        />
                                                                    </div>
                                                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                                        <label className="text-white">
                                                                            Desde *
                                                                        </label>
                                                                        <Field 
                                                                            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                            name={`education.${index}.dateSince`}
                                                                            type="date" placeholder="Desde" />
                                                                    </div>
                                                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                                        <label className="text-white">
                                                                            Hasta
                                                                        </label>
                                                                        {education.currently ?
                                                                            <Field
                                                                            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                                name={`education.${index}.dateTo`}
                                                                                placeholder="Hasta"
                                                                                type="date"
                                                                                disabled
                                                                            />
                                                                            :
                                                                            <Field
                                                                            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                                name={`education.${index}.dateTo`}
                                                                                placeholder="Hasta"
                                                                                type="date"
                                                                            />
                                                                        }
                                                                    </div>
                                                                    <div className="w-full  md:w-1/4 px-3 md:mb-0  flex items-center">
                                                                        <Field
                                                                            className="mt-6 px-3 accent-black"
                                                                            type="checkbox"
                                                                            name={`education.${index}.currently`}
                                                                        />
                                                                        <label
                                                                            className="hover:cursor-pointer px-3  mt-6 text-white"
                                                                        >
                                                                            Actualidad
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ))}
                                                    <div className="flex flex-wrap justify-end">
                                                        <AddBtn
                                                            onClick={() => push({initialEducation})}
                                                            label='Agregar Educacion'
                                                        />
                                                    </div>

                                                </div>
                                            )}
                                        </FieldArray>
                                    )
                                }
                            </div>


                            {/* STEP 3 - Certificados */}
                            <div>
                                {
                                    stepNo === 3 &&
                                    (
                                        <FieldArray name="certificates">
                                            {({ insert, remove, push }) => (
                                                <div>
                                                    {values.certificates.length > 0 &&
                                                        values.certificates.map((certificates, index) => (
                                                            <div key={index} className={`${values.certificates.length > 1 && 'border-b mb-5 border-zinc-600'}`}>
                                                                {
                                                                    values.certificates.length > 1 &&
                                                                    <div className="flex flex-wrap justify-end">
                                                                        <RemoveBtn
                                                                            onClick={() => remove(index)}
                                                                        />
                                                                    </div>
                                                                }
                                                                <div className="flex flex-wrap -mx-3 mb-6">
                                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                        <label className="text-white" htmlFor ={`certificates.${index}.degree`}>Titulo  *</label>
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                            name={`certificates.${index}.degree`}
                                                                            placeholder="Bases de datos SQL y No-SQL"
                                                                            type="text"
                                                                        />
                                                                    </div>
                                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                        <label className="text-white" htmlFor ={`certificates.${index}.university`}>Empresa  *</label>
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                            name={`certificates.${index}.university`}
                                                                            type="text"
                                                                        />
                                                                    </div>
                                                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                                        <label className="text-white">
                                                                            Desde *
                                                                        </label>
                                                                        <Field 
                                                                            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                            name={`certificates.${index}.dateSince`}
                                                                            type="date" placeholder="Desde" />
                                                                    </div>
                                                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                                        <label className="text-white">
                                                                            Hasta
                                                                        </label>
                                                                        {certificates.currently ?
                                                                            <Field
                                                                            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                                name={`certificates.${index}.dateTo`}
                                                                                placeholder="Hasta"
                                                                                type="date"
                                                                                disabled
                                                                            />
                                                                            :
                                                                            <Field
                                                                            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                                name={`certificates.${index}.dateTo`}
                                                                                placeholder="Hasta"
                                                                                type="date"
                                                                            />
                                                                        }
                                                                    </div>
                                                                    <div className="w-full  md:w-1/4 px-3  md:mb-0
                                                                    flex items-center">
                                                                        <Field
                                                                            className="mt-6 px-3 accent-black"
                                                                            type="checkbox"
                                                                            name={`certificates.${index}.currently`}
                                                                        />
                                                                        <label
                                                                            className="hover:cursor-pointer px-3  mt-6 text-white"
                                                                        >
                                                                            Actualidad
                                                                        </label>
                                                                    </div>
                                                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                                        <label className="text-xs mb-2 text-white" >
                                                                            Link/Id certificado *
                                                                        </label>
                                                                        <Field 
                                                                    className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                            name={`certificates.${index}.linkId`} 
                                                                            type="text" 
                                                                            placeholder="100034944234234" />
                                                                    </div>
                                                                    <div className="w-full  px-3 my-6 md:mb-0">
                                                                        <label className="text-white">Descripción *</label>
                                                                        <Field 
                                                                            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                            name={`certificates.${index}.description`} 
                                                                            type="text" 
                                                                            placeholder="Descripción"
                                                                            as="textarea"
                                                                            rows="5"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ))}
                                                    <div className="flex flex-wrap justify-end">
                                                        <AddBtn
                                                            onClick={() => push({initialCerticate})}
                                                            label='Agregar Educacion'
                                                        />
                                                    </div>

                                                </div>
                                            )}
                                        </FieldArray>
                                    )
                                }
                            </div>
                        </div>

                        {/* STEP 4 - Experiencias */}
                        <div>
                            {
                                stepNo === 4 &&
                                (
                                    <FieldArray name="experiences">
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {/* maps experiences field array */}
                                                {values.experiences.length > 0 &&
                                                    values.experiences.map((experiences, index) => (
                                                        <div key={index} className={`${values.experiences.length > 1 && 'border-b border-zinc-600 mb-5'}`}>
                                                            {
                                                                values.experiences.length > 1 &&
                                                                <div className="flex flex-wrap justify-end">
                                                                    <RemoveBtn
                                                                        onClick={() => remove(index)}
                                                                    />
                                                                </div>
                                                            }
                                                            <div className="flex flex-wrap -mx-3 mb-6 font-ibm">
                                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                    <label className="text-white" htmlFor ={`experiences.${index}.title`}>Titulo *</label>
                                                                    <Field
                                                                        name={`experiences.${index}.title`}
                                                                        placeholder="Lider UX"
                                                                        type="text"
                                                                        className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                    />
                                                                </div>
                                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                    <label className="text-white" htmlFor ={`experiences.${index}.company`}>Empresa *</label>
                                                                    <Field
                                                                        className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                        name={`experiences.${index}.company`}
                                                                        type="text"
                                                                    />
                                                                </div>
                                                                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                                    <label className="text-white" htmlFor ={`experiences.${index}.dateSince`}>Desde *</label>
                                                                    <Field
                                                                        className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                        name={`experiences.${index}.dateSince`}
                                                                        placeholder="Sep 2023"
                                                                        type="date"
                                                                    />
                                                                </div>
                                                                <div
                                                                    className="w-full md:w-1/4 px-3 mb-6 md:mb-0"
                                                                >
                                                                    <label className="text-white" htmlFor ={`experiences.${index}.dateTo`}>Hasta</label>
                                                                    {experiences.currently ?
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                            name={`experiences.${index}.dateTo`}
                                                                            placeholder="Sep 2023"
                                                                            type="date"
                                                                            disabled
                                                                        />
                                                                        :
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                            name={`experiences.${index}.dateTo`}
                                                                            placeholder="Sep 2023"
                                                                            type="date"
                                                                        />
                                                                    }
                                                                </div>
                                                                <div className="w-full  md:w-1/4 px-3 md:mb-0  flex items-center">
                                                                    <Field
                                                                        className="mt-6 px-3 accent-black"
                                                                        type="checkbox"
                                                                        name={`experiences.${index}.currently`} />
                                                                    <label className="hover:cursor-pointer px-3  mt-6 ">
                                                                        Actualidad
                                                                    </label>
                                                                </div>
                                                                <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                                    <label className="text-white" htmlFor ={`experiences.${index}.place`}>Lugar</label>
                                                                    <Field
                                                                        className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                        name={`experiences.${index}.place`}
                                                                        type="text" placeholder="Argentina" />
                                                                </div>
                                                                <div className="w-full  px-3 mb-6 md:mb-0">
                                                                    <label className="text-white" htmlFor ={`experiences.${index}.place`}>Descripción *</label>
                                                                    <Field 
                                                                        className="mt-2 appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                                        name={`experiences.${index}.description`} 
                                                                        type="text" 
                                                                        placeholder="Descripción"
                                                                        as="textarea"
                                                                        rows="5"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ))}
                                                <div className="flex flex-wrap justify-end">
                                                    {/* Adds new experiences field */}
                                                    <AddBtn
                                                        onClick={() => push(initialExperience)}
                                                        label='Agregar Experiencia'
                                                    />
                                                </div>

                                            </div>
                                        )}
                                    </FieldArray>
                                )
                            }
                        </div>

                        <div>
                            {/* Confirmacion */}
                            {
                                stepNo === 5 &&
                                (
                                <div>
                                    <p className="text-sm text-gray-600 mb-16">Todo listo para descargar! Inicia sesión para guardar esta información para el futuro.</p>
                                    <div className="flex justify-center gap-10 items-center">
                                        <button type="button" className="px-3 py-2 bg-gray-500 rounded text-sm"
                                        onClick={() => onClickPrev()}>
                                            <p className="text-white m-auto">{'<'} Volver</p>
                                        </button>
                                        <button type="submit" className="p-3 bg-shadeBlue rounded text-md">
                                            <p className="text-white m-auto">Crear y descargar PDF</p>
                                        </button>
                                    </div>
                                </div>
                                )
                            }
                        </div>


                        {
                                stepNo < 5 &&
                                <div className="flex justify-end gap-5 mt-10">
                                    <button type="button" className={`px-3 py-2 plain-button rounded text-sm ${stepNo === 1 && 'bg-none bg-gray-400'}`}
                                    onClick={() => onClickPrev()}
                                    disabled={stepNo === 1}>
                                        <p className="text-white m-auto">{'<'} Anterior</p>
                                    </button>
                                    <button type="button" className={`px-3 py-2 plain-button rounded text-sm ${false && 'bg-gray-400'}`}
                                    onClick={() => onClickNext(errors)}>
                                        <p className="text-white m-auto">Siguiente &gt;</p>
                                    </button>
                                </div>
                        }
                    </Form>)
            }}
        </Formik>


    )
}
export default FormLayout