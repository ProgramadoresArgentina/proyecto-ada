import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import { basicSchema } from '../../schemas/basicSchema';
import AddBtn from './AddBtn';
import RemoveBtn from './RemoveBtn';

const FormLayout: React.FC<{}> = () => {

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

        experiences: [{
            title: "",
            company: "",
            dateSince: "",
            dateTo: "",
            currently: false,
            place: "",
            description: "",
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
        }]
    }

    return (
        <Formik

            initialValues={initialValues}
            onSubmit={(values, actions) => {
                console.log(values)
                actions.resetForm();
            }}
            validationSchema={basicSchema}
        >
            {({ values }) => {
                return (
                    <Form className="w-full md:w-1/2 mx-auto my-4 md:ml-4 font-ibm text-textGrey">
                        <h1 className='flex block text-center text-4xl font-normal mb-8 font-manrope text-black'>Generar PDF</h1>
                        {/* Datos principales */}
                        <FieldArray name="basic">
                            {() => (
                                <div className="my-8">
                                    <h1 className="text-xl font-extrabold font-manrope text-black mb-2 ">Información general </h1>
                                    {/* maps basic info fields */}
                                    {values.basic.length > 0 &&
                                        values.basic.map((basic, index) => (
                                            <div key={index} className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label>
                                                        Nombre Completo *
                                                    </label>
                                                    <Field
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                        name={`basic.${index}.name`}
                                                        placeholder="Programadores Argentina"
                                                        type="text"
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name={`basic.${index}.name`} />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label className=' flex whitespace-nowrap'>
                                                        Posición actual/buscada  *
                                                    </label>
                                                    <Field
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                        name={`basic.${index}.position`}
                                                        placeholder="Comunidad de programadores en Arg..."
                                                        type="text"
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name={`basic.${index}.position`} />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label>
                                                        Email *
                                                    </label>
                                                    <Field
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                        name={`basic.${index}.email`}
                                                        placeholder="programadoresargentina@gmail...."
                                                        type="email"

                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name={`basic.${index}.email`} />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label>
                                                        Sitio web/Portfolio
                                                    </label>
                                                    <Field
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                        name={`basic.${index}.portfolio`}
                                                        placeholder="programadoresargentina.com"
                                                        type="text"

                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name={`basic.${index}.portfolio`} />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label>
                                                        Linkedin user
                                                    </label>
                                                    <Field
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                        name={`basic.${index}.linkedIn`}
                                                        placeholder="linkedin.com/"
                                                        type="text"

                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name={`basic.${index}.linkedIn`} />
                                                </div>
                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                    <label>
                                                        Github user
                                                    </label>
                                                    <Field
                                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                        name={`basic.${index}.github`}
                                                        placeholder="github.com/"
                                                        type="text"
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name={`basic.${index}.github`} />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </FieldArray>

                        {/* Experiencias */}
                        <FieldArray name="experiences">
                            {({ insert, remove, push }) => (
                                <div className="my-8">
                                    <h1 className="text-xl font-extrabold font-manrope text-black">Experiencia</h1>
                                    {/* maps experiences field array */}
                                    {values.experiences.length > 0 &&
                                        values.experiences.map((experiences, index) => (
                                            <div key={index}>
                                                <div className="flex flex-wrap justify-end">
                                                    {/* Removes experiences field */}
                                                    <RemoveBtn
                                                        onClick={() => remove(index)}
                                                    />
                                                </div>
                                                <div className="flex flex-wrap -mx-3 mb-6 font-ibm">
                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <label htmlFor={`experiences.${index}.title`}>Titulo *</label>
                                                        <Field
                                                            name={`experiences.${index}.title`}
                                                            placeholder="Lider UX"
                                                            type="text"
                                                            className="appearance-none block w-full bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`experiences.${index}.title`} />
                                                    </div>
                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <label htmlFor={`experiences.${index}.company`}>Empresa *</label>
                                                        <Field
                                                            className="appearance-none block w-full  bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            name={`experiences.${index}.company`}
                                                            placeholder="Cyfirma"
                                                            type="text"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`experiences.${index}.company`} />
                                                    </div>
                                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                        <label htmlFor={`experiences.${index}.dateSince`}>Desde *</label>
                                                        <Field
                                                            className="appearance-none block w-full  bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-1 mb-3  leading-tight focus:outline-none focus:bg-white text-xs "
                                                            name={`experiences.${index}.dateSince`}
                                                            placeholder="Sep 2023"
                                                            type="date"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`experiences.${index}.dateSince`} />
                                                    </div>
                                                    <div
                                                        className="w-full md:w-1/4 px-3 mb-6 md:mb-0"
                                                    >
                                                        <label htmlFor={`experiences.${index}.dateTo`}>Hasta</label>
                                                        {experiences.currently ?
                                                            <Field
                                                                className="appearance-none block w-full bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-1 mb-3 leading-tight focus:outline-none focus:bg-white text-xs"
                                                                name={`experiences.${index}.dateTo`}
                                                                placeholder="Sep 2023"
                                                                type="date"
                                                                disabled
                                                            />
                                                            :
                                                            <Field
                                                                className="appearance-none block w-full bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-1 mb-3 leading-tight focus:outline-none focus:bg-white text-xs"
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
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`experiences.${index}.currently`} />
                                                    </div>
                                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                        <label htmlFor={`experiences.${index}.place`}>Lugar</label>
                                                        <Field
                                                            className="appearance-none block w-full  bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            name={`experiences.${index}.place`}
                                                            type="text" placeholder="Argentina" />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`experiences.${index}.place`} />
                                                    </div>
                                                    <div className="w-full  px-3 mb-6 md:mb-0">
                                                        <label htmlFor={`experiences.${index}.place`}>Descripción *</label>
                                                        <Field className=" h-32 appearance-none block w-full 
                                                         bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name={`experiences.${index}.description`} type="text" placeholder="Descripción"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`experiences.${index}.description`} />
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    <div className="flex flex-wrap justify-end">
                                        {/* Adds new experiences field */}
                                        <AddBtn
                                            onClick={() => push({})}
                                            label='Agregar Experiencia'
                                        />
                                    </div>

                                </div>
                            )}
                        </FieldArray>
                        {/* Education */}
                        <FieldArray name="education">
                            {({ insert, remove, push }) => (
                                <div className="my-8">
                                    <h1 className="text-xl font-extrabold font-manrope text-black">Educación</h1>
                                    {values.education.length > 0 &&
                                        values.education.map((education, index) => (
                                            <div key={index}>
                                                <div className="flex flex-wrap justify-end">
                                                    <RemoveBtn
                                                        onClick={() => remove(index)}
                                                    />
                                                </div>
                                                <div className="flex flex-wrap -mx-3 mb-6">
                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <label htmlFor={`education.${index}.degree`}>Titulo  *</label>
                                                        <Field
                                                            className="appearance-none block w-full  bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            name={`education.${index}.degree`}
                                                            placeholder="Analista en sistemas"
                                                            type="text"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`education.${index}.degree`} />
                                                    </div>
                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <label htmlFor={`education.${index}.university`}>Lugar  *</label>
                                                        <Field
                                                            className="appearance-none block w-full  bg-secondaryGrey  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            name={`education.${index}.university`}
                                                            placeholder="Univesidad de Buenos Aires"
                                                            type="text"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`education.${index}.university`} />
                                                    </div>
                                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                        <label >
                                                            Desde *
                                                        </label>
                                                        <Field className="appearance-none block w-full  bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-xs" name={`education.${index}.dateSince`}
                                                            type="date" placeholder="Desde" />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`education.${index}.dateSince`} />
                                                    </div>
                                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                        <label  >
                                                            Hasta
                                                        </label>
                                                        {education.currently ?
                                                            <Field
                                                                className="appearance-none block w-full bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-1 mb-3 leading-tight focus:outline-none focus:bg-white text-xs"
                                                                name={`education.${index}.dateTo`}
                                                                placeholder="Hasta"
                                                                type="date"
                                                                disabled
                                                            />
                                                            :
                                                            <Field
                                                                className="appearance-none block w-full bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-1 mb-3 leading-tight focus:outline-none focus:bg-white text-xs"
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
                                                            className="hover:cursor-pointer px-3  mt-6"
                                                        >
                                                            Actualidad
                                                        </label>
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`education.${index}.currently`} />
                                                    </div>
                                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                        <label >
                                                            Lugar *
                                                        </label>
                                                        <Field className="appearance-none block w-full  bg-secondaryGrey text-gray-700 border  bg-secondaryGrey rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name={`education.${index}.place`} type="text" placeholder="Lugar" />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`education.${index}.place`} />
                                                    </div>
                                                    <div className="w-full  px-3 my-6 md:mb-0">
                                                        <label>Descripción *</label>
                                                        <Field className="appearance-none block w-full h-32 bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            name={`education.${index}.description`} type="text" placeholder="Descripción"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    <div className="flex flex-wrap justify-end">
                                        <AddBtn
                                            onClick={() => push({})}
                                            label='Agregar Educacion'
                                        />
                                    </div>

                                </div>
                            )}
                        </FieldArray>
                        {/* Certificados */}
                        <FieldArray name="certificates">
                            {({ insert, remove, push }) => (
                                <div className="my-8">
                                    <h1 className="text-xl font-extrabold font-manrope text-black">Certificados</h1>
                                    {values.certificates.length > 0 &&
                                        values.certificates.map((certificates, index) => (
                                            <div key={index}>
                                                <div className="flex flex-wrap justify-end">
                                                    <RemoveBtn
                                                        onClick={() => remove(index)}
                                                    />
                                                </div>
                                                <div className="flex flex-wrap -mx-3 mb-6">
                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <label htmlFor={`certificates.${index}.degree`}>Titulo  *</label>
                                                        <Field
                                                            className="appearance-none block w-full  bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            name={`certificates.${index}.degree`}
                                                            placeholder="Bases de datos SQL y No-SQL"
                                                            type="text"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`certificates.${index}.degree`} />
                                                    </div>
                                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                        <label htmlFor={`certificates.${index}.university`}>Lugar  *</label>
                                                        <Field
                                                            className="appearance-none block w-full  bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            name={`certificates.${index}.university`}
                                                            placeholder="Soy Henry"
                                                            type="text"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`certificates.${index}.university`} />
                                                    </div>
                                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                        <label>
                                                            Desde *
                                                        </label>
                                                        <Field className="appearance-none block w-full  bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-xs" name={`certificates.${index}.dateSince`}
                                                            type="date" placeholder="Desde" />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`certificates.${index}.dateSince`} />
                                                    </div>
                                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                        <label >
                                                            Hasta
                                                        </label>
                                                        {certificates.currently ?
                                                            <Field
                                                                className="appearance-none block w-full bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-1 mb-3 leading-tight focus:outline-none focus:bg-white text-xs"
                                                                name={`certificates.${index}.dateTo`}
                                                                placeholder="Hasta"
                                                                type="date"
                                                                disabled
                                                            />
                                                            :
                                                            <Field
                                                                className="appearance-none block w-full bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-1 mb-3 leading-tight focus:outline-none focus:bg-white text-xs"
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
                                                            className="hover:cursor-pointer px-3  mt-6"
                                                        >
                                                            Actualidad
                                                        </label>
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`certificates.${index}.currently`} />
                                                    </div>
                                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                                        <label className="text-xs mb-2" >
                                                            Link/Id certificado *
                                                        </label>
                                                        <Field className="appearance-none block w-full  bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name={`certificates.${index}.linkId`} type="text" placeholder="100034944234234...." />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`certificates.${index}.linkId`} />
                                                    </div>
                                                    <div className="w-full  px-3 my-6 md:mb-0">
                                                        <label>Descripción *</label>
                                                        <Field className="appearance-none block w-full h-32 bg-secondaryGrey text-gray-700 border border-gray-200 rounded py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            name={`certificates.${index}.description`} type="text" placeholder="Descripción"
                                                        />
                                                        <ErrorMessage
                                                            component="div"
                                                            name={`certificates.${index}.description`} />
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    <div className="flex flex-wrap justify-end">
                                        <AddBtn
                                            onClick={() => push({})}
                                            label='Agregar Educacion'
                                        />
                                    </div>

                                </div>
                            )}
                        </FieldArray>
                        <button type="submit" className="flex w-full content-center p-3 mt-8 bg-shadeBlue rounded">
                            <p className="text-white m-auto">Submit </p>
                        </button>
                    </Form>)
            }}
        </Formik>


    )
}
export default FormLayout