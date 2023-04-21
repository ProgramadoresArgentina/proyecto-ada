import Image from "next/image";
import DownloadSampleBtn from '../components/FormComponents/DownloadSampleBtn';
import cvimg from '../public/form/cvimg.png';
import ellipsis from '../public/form/Ellipse 48.png';
import rectangle from '../public/form/Rectangle 23.png';
import FormLayout from '../components/FormComponents/FormLayout';
import SaveBtn from '../components/FormComponents/SaveBtn';
import DownloadFormBtn from "../components/FormComponents/DowloadFormBtn";

const generarcv: React.FC = () => {
    const dots = Array.from({ length: 80 }, (_, index) => ellipsis);
    return (
        <div className="mx-16">
            <div className='flex flex-wrap md:justify-between  font-manrope'>
                <div className='w-full  md:w-2/4 my-8  mx-auto md:ml-0 px-4'>
                    <h1 className='w-full justify-left text-5xl font-normal leading-10'>Es momento de mejorar tu curriculum</h1>
                    <p className='font-normal text-xl  mt-10  mx-auto leading-8'>Crea un currículum atractivo y profesional en menos de 10 minutos con nuestro generador de pdf. Logra una buena impresión y aumenta tus posibilidades de conseguir el empleo de tus sueños.
                    </p>
                    <div className="w-full md:w-1/5 h-36 flex flex-wrap absolute top-60 left-10 -z-10">
                        {dots.map((ellipsis, index) => (
                            <Image
                                alt="ellipsis"
                                className="mx-3 my-2"
                                key={index}
                                src={ellipsis}
                            />
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <Image
                        alt="cv"
                        className="mx-auto md:mr-0"
                        height={454}
                        src={cvimg}
                        width={319}
                    />
                    <DownloadSampleBtn
                        onClick={() => alert("Downloaded")}
                    />
                    <Image
                        alt="rectangle"
                        className=" absolute -z-10 top-1/2 -right-40 -translate-x-1/2 -translate-y-1/2 rotate-20"
                        height={75}
                        src={rectangle}
                        width={150}
                    />
                </div>
            </div>
            <div className="flex flex-wrap w-full  justify-center md:justify-around my-4">
                <FormLayout />
                <div className="flex flex-col w-full mx-auto  md: mr-0 md:w-1/3  md:mt-20 px-6 py-8 md:bg-secondaryGrey  h-full  relative">
                    <Image
                        alt="cv"
                        className="mx-auto lg:ml-2 w-full h-full  md:h-132"
                        src={cvimg}
                    />
                    <div className="flex flex-wrap justify-center lg:justify-end lg:absolute z-1 lg:-bottom-6 lg:right-2">
                        <SaveBtn onClick={() => alert("Guardado")} />
                        <DownloadFormBtn onClick={() => alert("Descargado")} />
                    </div>
                </div>
            </div>
        </div >
    )

}

export default generarcv
