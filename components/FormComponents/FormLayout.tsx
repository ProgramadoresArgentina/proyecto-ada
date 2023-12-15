import { Formik, Field, Form, FieldArray, getIn } from 'formik';
import { basicSchema } from '../../schemas/basicSchema';
import AddBtn from './AddBtn';
import RemoveBtn from './RemoveBtn';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { launchToast } from '../../helpers/launchToast';
var initialValuesMock = {
    title: "Nuevo curriculum",
    basic: [{
        username: "",
        position: "",
        portfolio: "",
        linkedIn: "",
        github: "",
        description: ""
    }],
    education: [{
        degree: "",
        university: "",
        dateSince: "",
        dateTo: "",
        currently: false,
        description: ""
    }],
    certificates: [{
        degree: "",
        university: "",
        linkId: ""
    }],
    experiences: [{
        title: "",
        company: "",
        dateSince: "",
        dateTo: "",
        currently: false,
        description: "",
    }],
    languages: [{
        name: "",
        level: ""
    }]
}

const FormLayout = (params) => {
    const [initialValues, setInitialValues] = useState(initialValuesMock);
    const [stepNo, setStepNo] = useState(1);
    const [loading, setLoading] = useState(true);
    const steps = ['Personal', 'Educación', 'Certificados', 'Experiencia', 'Idiomas', 'Descargar']


    useEffect(() => {
        if (params.id && params.id !== 0) {
            loadResumeForm(params.id);
        } else {
            getUserData();
        }
    }, []);

    function getUserData() {
        setLoading(true);
        fetch('/api/user')
            .then(response => {
                if (response.status !== 200) throw Error();
                return response.json()
            })
          .then(data => {
            initialValuesMock.basic[0].username = data.username;
            setInitialValues(initialValuesMock);
            setLoading(false);
        })
          .catch(error => {
            launchToast("error","Error al cargar lista de cv, intentelo nuevamente.");
        });
    }

    function loadResumeForm(resumeId: number) {
        setLoading(true);
        fetch(`/api/resume/${resumeId}`)
            .then(response => {
                if (response.status !== 200) throw Error();
                return response.json()
            })
          .then(cvData => {
            const formatValue = {
                title: cvData.title,
                basic: [{
                    username: cvData.user.username,
                    position: "",
                    portfolio: "",
                    linkedIn: "",
                    github: "",
                    description: ""
                }],
                education: cvData.education.map(e => {e.dateSince = formatDateFromDatabase(e.dateSince);e.dateTo = formatDateFromDatabase(e.dateTo);return e;}) ,
                certificates: cvData.certifications,
                experiences: cvData.experience.map(e => {e.dateSince = formatDateFromDatabase(e.dateSince);e.dateTo = formatDateFromDatabase(e.dateTo);return e;}) ,
                languages: cvData.languages
            }
            setInitialValues(formatValue);
            setLoading(false);
        })
          .catch(error => {
            launchToast("error","Error al cargar, intentelo nuevamente.");
        });
    }

    function formatDateFromDatabase(dateString: string): string {
        if (!dateString) return "";
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
        const day = String(dateObject.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const onSubmit = (values) => {
        setLoading(true);
        const body = {
            title: values.title,
            certifications: values.certificates || [],
            education: values.education || [],
            experience: values.experiences || [],
            languages: values.languages || [],
        }
        fetch(`/api/resume/${params.id}`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if (response.status !== 200) throw Error();
            return response.json()
        })
        .then(res => {
            setLoading(false);
            console.log(res);
            // saveAs(blob, `${values.basic[0].name}-${Date.now()}.pdf`);
            // actions.resetForm();
        })
        .catch(error => {
            launchToast("error","Error al intentar crear el curriculum, intentelo nuevamente.");
            setLoading(false);
        });
    }

    const downloadCv = (cvId: number) => {
        fetch(`/api/resume/download/${cvId}`)
        .then(response => response.blob())
        .then(blob => {
            setLoading(false);
            launchToast("success", "Procesando y descargando CV");
            // saveAs(blob, `${values.basic[0].name}-${Date.now()}.pdf`);
            // actions.resetForm();
        })
        .catch(error => {
            setLoading(false);
            console.error(error);
        });
    }

    const onClickNext = (errors) => {
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

    if (loading) {
        return (
        <div className="flex items-center justify-center gap-5">
            <div className="w-5 h-5 aspect-square rounded-full border-4 border-solid border-l-indigo-500 border-t-indigo-500 animate-spin"></div>
            <span className='text-white'>Cargando tu CV..</span>
        </div>
        )
    }


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                onSubmit(values);
            }}
            validationSchema={basicSchema}
            validateOnMount
        >
            {({ values, errors, touched, isValid, validateForm }) => {
                const isStepValid = (stepNo) => {
                    switch (stepNo) {
                        case 1:
                            return !errors.basic || Object.keys(errors.basic).length === 0;
                        case 2:
                            return !errors.education || Object.keys(errors.education).length === 0;
                        case 3:
                            return !errors.certificates || Object.keys(errors.certificates).length === 0;
                        case 4:
                            return !errors.experiences || Object.keys(errors.experiences).length === 0;
                        case 5:
                            return !errors.languages || Object.keys(errors.languages).length === 0;
                        default:
                            return true;
                    }
                  };

                return (
                    <Form className="w-full font-ibm text-textGrey z-10 bg-[#161B22] p-10 rounded-md shadow-md">
                        <ol className="mb-10 items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base
                        grid-cols-3 grid md:flex md:grid-cols-none">
                            {
                                steps.map((step, i) => (
                                    <li key={i} className={`flex items-center cursor-pointer ${((i+1) === stepNo) && "text-[#F78001] "}
                                     ${((i+1) !== steps.length) && "after:hidden md:w-full sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1"}`}>
                                        <span className={`${(steps.length !== (i+1)) ? "flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500":"mr-2 flex font-roboto"}`}>
                                            {
                                                isStepValid(i+1) && (i < 5) ?
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
                                                            <div className="w-full px-3 mb-0">
                                                                <label className="text-white">
                                                                    Nombre de curriculum * 
                                                                    {
                                                                        getIn(errors, `title`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `title`)})</span>
                                                                    }
                                                                </label>
                                                                <Field
                                                                    className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  bg-[#2D3138]"
                                                                    name={`title`}
                                                                    placeholder="Curriculum en español"
                                                                    type="text"
                                                                    id={getIn(errors, `title`) && 'invalid'}
                                                                />
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-3 mb-0">
                                                                <label className="text-white">
                                                                    Nombre de usuario * 
                                                                    {
                                                                        getIn(errors, `basic.${index}.username`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `basic.${index}.username`)})</span>
                                                                    }
                                                                </label>
                                                                <Field
                                                                    disabled="true"
                                                                    className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  bg-[#2D3138]"
                                                                    name={`basic.${index}.username`}
                                                                    placeholder="Programadores Argentina"
                                                                    type="text"
                                                                    id={getIn(errors, `basic.${index}.username`) && 'invalid'}
                                                                />
                                                            </div>
                                                            
                                                            <div className="w-full md:w-1/2 px-3 mb-0 hidden">
                                                                <label className=' flex whitespace-nowrap text-white'>
                                                                    Posición actual/buscada  *
                                                                    {
                                                                        getIn(errors, `basic.${index}.position`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `basic.${index}.position`)})</span>
                                                                    }
                                                                </label>
                                                                <Field
                                                                    className="mt-2 appearance-none block w-full  text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                    name={`basic.${index}.position`}
                                                                    placeholder="Desarrollador de Software Junior"
                                                                    type="text"
                                                                    id={getIn(errors, `basic.${index}.position`) && 'invalid'}
                                                                />
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-3 mb-0 hidden">
                                                                <label className="text-white">
                                                                    Sitio web/Portfolio
                                                                </label>
                                                                <Field
                                                                    className="mt-2 appearance-none block w-full  text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                    name={`basic.${index}.portfolio`}
                                                                    placeholder="programadoresargentina.com"
                                                                    type="text"
                                                                    id={getIn(errors, `basic.${index}.portfolio`) && 'invalid'}
                                                                />
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-3 mb-0 hidden">
                                                                <label className="text-white">
                                                                    Linkedin user
                                                                </label>
                                                                <Field
                                                                    className="mt-2 appearance-none block w-full  text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                    name={`basic.${index}.linkedIn`}
                                                                    placeholder="linkedin.com/programadoresargentina"
                                                                    type="text"
                                                                    id={getIn(errors, `basic.${index}.linkedIn`) && getIn(touched, `basic.${index}.linkedIn`) && 'invalid'}
                                                                />
                                                            </div>
                                                            <div className="w-full md:w-1/2 px-3 mb-0 hidden">
                                                                <label className="text-white">
                                                                    Github user
                                                                </label>
                                                                <Field
                                                                    className="mt-2 appearance-none block w-full  text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                    name={`basic.${index}.github`}
                                                                    placeholder="github.com/ProgramadoresArgentina"
                                                                    type="text"
                                                                    id={getIn(errors, `basic.${index}.github`) && getIn(touched, `basic.${index}.github`) && 'invalid'}
                                                                />
                                                            </div>
                                                            <div className="w-full px-3 mb-0">
                                                                <label className="text-white">Descripción</label>
                                                                <Field 
                                                                    className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                    name={`basic.${index}.description`} 
                                                                    type="text" 
                                                                    placeholder="Descripción"
                                                                    as="textarea"
                                                                    rows="5"
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
                                                                    values.education.length >= 1 &&
                                                                    <div className="flex flex-wrap justify-end">
                                                                        <RemoveBtn
                                                                            onClick={() => remove(index)}
                                                                        />
                                                                    </div>
                                                                }
                                                                <div className="flex flex-wrap -mx-3 mb-6">
                                                                    <div className="w-full md:w-1/2 px-3 mb-0">
                                                                        <label className="text-white">
                                                                            Titulo  *
                                                                            {
                                                                                getIn(errors, `education.${index}.degree`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `education.${index}.degree`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            name={`education.${index}.degree`}
                                                                            placeholder="Analista en sistemas"
                                                                            type="text"
                                                                            id={getIn(errors, `education.${index}.degree`) && 'invalid'}
                                                                        />
                                                                    </div>
                                                                    <div className="w-full md:w-1/2 px-3 mb-0">
                                                                        <label className="text-white">
                                                                            Institución  *
                                                                            {
                                                                                getIn(errors, `education.${index}.university`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `education.${index}.university`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            name={`education.${index}.university`}
                                                                            placeholder="Univesidad de Buenos Aires"
                                                                            type="text"
                                                                            id={getIn(errors, `education.${index}.university`) && 'invalid'}
                                                                        />
                                                                    </div>
                                                                    <div className="w-full md:w-1/4 px-3 mb-0">
                                                                        <label className="text-white">
                                                                            Desde *
                                                                            {
                                                                                getIn(errors, `education.${index}.dateSince`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `education.${index}.dateSince`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field 
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            name={`education.${index}.dateSince`}
                                                                            type="date" placeholder="Desde"
                                                                            id={getIn(errors, `education.${index}.dateSince`) && !education.currently && 'invalid'} />
                                                                    </div>
                                                                    <div className="w-full md:w-1/4 px-3 mb-0">
                                                                        <label className="text-white">
                                                                            Hasta
                                                                            {
                                                                                getIn(errors, `education.${index}.dateTo`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `education.${index}.dateTo`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            name={`education.${index}.dateTo`}
                                                                            placeholder="Hasta"
                                                                            id={getIn(errors, `education.${index}.dateTo`) && 'invalid'}
                                                                            type="date"
                                                                            disabled={education.currently}
                                                                        />
                                                                    </div>
                                                                    <div className="checkbox-wrapper-4 w-full md:w-1/4 px-3 md:mb-0  flex items-center mt-5">
                                                                        <Field
                                                                            className="inp-cbx"
                                                                            type="checkbox"
                                                                            name={`education.${index}.currently`}
                                                                            id={`education.${index}.currently`}
                                                                        />
                                                                        <label className="cbx" htmlFor={`education.${index}.currently`}><span>
                                                                        <svg width="12px" height="10px">
                                                                            <use href="#check-4"></use>
                                                                        </svg></span><span>Actualidad</span></label>
                                                                        <svg className="inline-svg">
                                                                            <symbol id="check-4" viewBox="0 0 12 10">
                                                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                                            </symbol>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="w-full">
                                                                    <label className="text-white">Descripción</label>
                                                                    <Field 
                                                                        className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                        name={`education.${index}.description`} 
                                                                        type="text" 
                                                                        placeholder="Descripción"
                                                                        as="textarea"
                                                                        rows="5"
                                                                    />
                                                                </div>
                                                            </div>

                                                        ))}
                                                    <div className="flex flex-wrap justify-end">
                                                        <AddBtn
                                                            onClick={() => push(initialValuesMock.education[0])}
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
                                                                    values.certificates.length >= 1 &&
                                                                    <div className="flex flex-wrap justify-end">
                                                                        <RemoveBtn
                                                                            onClick={() => remove(index)}
                                                                        />
                                                                    </div>
                                                                }
                                                                <div className="flex flex-wrap -mx-3 mb-6">
                                                                    <div className="w-full md:w-1/3 px-3 mb-0">
                                                                        <label className="text-white" htmlFor ={`certificates.${index}.degree`}>
                                                                            Titulo  *
                                                                            {
                                                                                getIn(errors, `certificates.${index}.degree`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `certificates.${index}.degree`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            name={`certificates.${index}.degree`}
                                                                            placeholder="Bases de datos SQL y No-SQL"
                                                                            type="text"
                                                                            id={getIn(errors, `certificates.${index}.degree`) && 'invalid'}
                                                                        />
                                                                    </div>
                                                                    <div className="w-full md:w-1/3 px-3 mb-0">
                                                                        <label className="text-white" htmlFor ={`certificates.${index}.university`}>
                                                                            Institucion  *
                                                                            {
                                                                                getIn(errors, `certificates.${index}.university`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `certificates.${index}.university`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            name={`certificates.${index}.university`}
                                                                            type="text"
                                                                            id={getIn(errors, `certificates.${index}.university`) && 'invalid'}
                                                                        />
                                                                    </div>
                                                                    <div className="w-full md:w-1/3 px-3 mb-0">
                                                                        <label className="text-xs mb-2 text-white" >
                                                                            Link/Id certificado *
                                                                            {
                                                                                getIn(errors, `certificates.${index}.linkId`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `certificates.${index}.linkId`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field 
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            name={`certificates.${index}.linkId`} 
                                                                            type="text" 
                                                                            placeholder="100034944234234"
                                                                            id={getIn(errors, `certificates.${index}.linkId`) && 'invalid'} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ))}
                                                    <div className="flex flex-wrap justify-end">
                                                        <AddBtn
                                                            onClick={() => push(initialValuesMock.certificates[0])}
                                                            label='Agregar Certificado'
                                                        />
                                                    </div>

                                                </div>
                                            )}
                                        </FieldArray>
                                    )
                                }
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
                                                                    values.experiences.length >= 1 &&
                                                                    <div className="flex flex-wrap justify-end">
                                                                        <RemoveBtn
                                                                            onClick={() => remove(index)}
                                                                        />
                                                                    </div>
                                                                }
                                                                <div className="flex flex-wrap -mx-3 mb-6 font-ibm">
                                                                    <div className="w-full md:w-1/2 px-3 mb-0">
                                                                        <label className="text-white" htmlFor ={`experiences.${index}.title`}>
                                                                            Titulo *
                                                                            {
                                                                                getIn(errors, `experiences.${index}.title`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `experiences.${index}.title`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field
                                                                            name={`experiences.${index}.title`}
                                                                            placeholder="Lider UX"
                                                                            type="text"
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            id={getIn(errors, `experiences.${index}.title`) && 'invalid'}
                                                                        />
                                                                    </div>
                                                                    <div className="w-full md:w-1/2 px-3 mb-0">
                                                                        <label className="text-white" htmlFor ={`experiences.${index}.company`}>
                                                                            Empresa *
                                                                            {
                                                                                getIn(errors, `experiences.${index}.company`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `experiences.${index}.company`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            name={`experiences.${index}.company`}
                                                                            type="text"
                                                                            id={getIn(errors, `experiences.${index}.company`) && 'invalid'}
                                                                        />
                                                                    </div>
                                                                    <div className="w-full md:w-1/4 px-3 mb-0">
                                                                        <label className="text-white" htmlFor={`experiences.${index}.dateSince`}>
                                                                            Desde *
                                                                            {
                                                                                getIn(errors, `experiences.${index}.dateSince`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `experiences.${index}.dateSince`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            name={`experiences.${index}.dateSince`}
                                                                            placeholder="Sep 2023"
                                                                            type="date"
                                                                            id={getIn(errors, `experiences.${index}.dateSince`) && 'invalid'}
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className="w-full md:w-1/4 px-3 mb-0"
                                                                    >
                                                                        <label className="text-white" htmlFor ={`experiences.${index}.dateTo`}>
                                                                            Hasta
                                                                            {
                                                                                getIn(errors, `experiences.${index}.dateTo`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `experiences.${index}.dateTo`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            name={`experiences.${index}.dateTo`}
                                                                            placeholder="Sep 2023"
                                                                            type="date"
                                                                            disabled={experiences.currently}
                                                                            id={getIn(errors, `experiences.${index}.dateSince`) && !experiences.currently && 'invalid'}
                                                                        />
                                                                    </div>
                                                                    <div className="checkbox-wrapper-4 w-full md:w-1/4 px-3 md:mb-0  flex items-center mt-5">
                                                                        <Field
                                                                            className="inp-cbx"
                                                                            type="checkbox"
                                                                            name={`experiences.${index}.currently`}
                                                                            id={`experiences.${index}.currently`}
                                                                        />
                                                                        <label className="cbx" htmlFor={`experiences.${index}.currently`}><span>
                                                                        <svg width="12px" height="10px">
                                                                            <use href="#check-4"></use>
                                                                        </svg></span><span>Actualidad</span></label>
                                                                        <svg className="inline-svg">
                                                                            <symbol id="check-4" viewBox="0 0 12 10">
                                                                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                                            </symbol>
                                                                        </svg>
                                                                    </div>
                                                                    <div className="w-full px-3 my-6 md:mb-0">
                                                                        <label className="text-white" htmlFor ={`experiences.${index}.place`}>
                                                                            Descripción *
                                                                            {
                                                                                getIn(errors, `experiences.${index}.description`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `experiences.${index}.description`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field 
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            name={`experiences.${index}.description`} 
                                                                            type="text" 
                                                                            placeholder="Descripción"
                                                                            as="textarea"
                                                                            rows="5"
                                                                            id={getIn(errors, `experiences.${index}.description`) && 'invalid'}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ))}
                                                    <div className="flex flex-wrap justify-end">
                                                        {/* Adds new experiences field */}
                                                        <AddBtn
                                                            onClick={() => push(initialValuesMock.experiences[0])}
                                                            label='Agregar Experiencia'
                                                        />
                                                    </div>

                                                </div>
                                            )}
                                        </FieldArray>
                                    )
                                }
                            </div>

                            {/* STEP 5 - Idiomas */}
                            <div>
                                {
                                    stepNo === 5 &&
                                    (
                                        <FieldArray name="languages">
                                            {({ insert, remove, push }) => (
                                                <div>
                                                    {values.languages.length > 0 &&
                                                        values.languages.map((_, index) => (
                                                            <div key={index} className={`${values.languages.length > 1 && 'border-b border-zinc-600 mb-5'}`}>
                                                                {
                                                                    values.languages.length > 1 &&
                                                                    <div className="flex flex-wrap justify-end">
                                                                        <RemoveBtn
                                                                            onClick={() => remove(index)}
                                                                        />
                                                                    </div>
                                                                }
                                                                <div className="flex flex-wrap -mx-3 mb-6 font-ibm">
                                                                    <div className="w-full md:w-1/2 px-3 mb-0">
                                                                        <label className="text-white" htmlFor ={`languages.${index}.name`}>
                                                                            Idioma *
                                                                            {
                                                                                getIn(errors, `languages.${index}.name`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `languages.${index}.name`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field
                                                                            name={`languages.${index}.name`}
                                                                            as="select"
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            id={getIn(errors, `languages.${index}.name`) && 'invalid'}
                                                                        >
                                                                            <option value="" disabled>Seleccionar</option>
                                                                            <option value="Español">Español</option>
                                                                            <option value="Inglés">Inglés</option>
                                                                            <option value="Portugués">Portugués</option>
                                                                        </Field>
                                                                    </div>
                                                                    <div className="w-full md:w-1/2 px-3 mb-0">
                                                                        <label className="text-white" htmlFor ={`languages.${index}.level`}>
                                                                            Nivel *
                                                                            {
                                                                                getIn(errors, `languages.${index}.level`) && <span className='text-red-300 text-sm ml-2'>({getIn(errors, `languages.${index}.level`)})</span>
                                                                            }
                                                                        </label>
                                                                        <Field
                                                                            name={`languages.${index}.level`}
                                                                            as="select"
                                                                            className="mt-2 appearance-none block w-full text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-[#2D3138]"
                                                                            id={getIn(errors, `languages.${index}.level`) && 'invalid'}
                                                                        >
                                                                            <option value="" disabled>Seleccionar</option>
                                                                            <option value="A1_A2">A1-A2</option>
                                                                            <option value="B1_B2">B1-B2</option>
                                                                            <option value="C1_C2">C1-C2</option>
                                                                            <option value="NATIVE">Nativo</option>
                                                                        </Field>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    <div className="flex flex-wrap justify-end">
                                                        {/* Adds new language field */}
                                                        <AddBtn
                                                            onClick={() => push(initialValuesMock.languages[0])}
                                                            label='Agregar Idioma'
                                                        />
                                                    </div>
                                                </div>
                                             )}
                                        </FieldArray>
                                    )
                                }
                            </div>

                            {/* STEP 6 - Confirmacion */}
                            <div>
                                {
                                    stepNo === 6 &&
                                    (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-16">Todo listo para descargar! Inicia sesión para guardar esta información para el futuro.</p>
                                        <div className="flex justify-center gap-10 items-center">
                                            {
                                                loading ?
                                                <div role="status" className='flex items-center'>
                                                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                    </svg>
                                                    <span className="text-white">Generando cv, por favor espere...</span>
                                                </div>
                                                :
                                                <>
                                                    <button type="button" className="px-3 py-2 bg-gray-500 rounded text-sm"
                                                    onClick={() => onClickPrev()}>
                                                        <p className="text-white m-auto">{'<'} Volver</p>
                                                    </button>
                                                    <button type="submit" className="p-3 bg-shadeBlue rounded text-md"
                                                    onClick={() => onSubmit(values)}>
                                                        <p className="text-white m-auto">Crear y descargar PDF</p>
                                                    </button>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    )
                                }
                            </div>
                        </div>

                        {
                                stepNo < 6 &&
                                <div className="flex justify-end gap-5 mt-10">
                                    {
                                        stepNo > 1 &&
                                        <button type="button" className="px-3 py-2 plain-button rounded text-sm"
                                        onClick={() => onClickPrev()}
                                        disabled={stepNo === 1}>
                                            <p className="text-white m-auto">{'<'} Anterior</p>
                                        </button>
                                    }
                                    <div data-tooltip-id="tooltip" data-tooltip-content={!isStepValid(stepNo) ? "Completa los campos para continuar" : "Siguiente"}>
                                        <button type="button" className="px-3 py-2 plain-button rounded text-sm"
                                        onClick={() => onClickNext(errors)} disabled={!isStepValid(stepNo)}>
                                            <p className="text-white m-auto">Siguiente &gt;</p>
                                        </button>
                                    </div>
                                </div>
                        }
                    </Form>)
            }}
        </Formik>


    )
}
export default FormLayout