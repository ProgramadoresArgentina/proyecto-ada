import ellipsis from '../public/form/Ellipse 48.png';
import FormLayout from '../components/FormComponents/FormLayout';

const generarcv: React.FC = () => {
    const dots = Array.from({ length: 80 }, (_, index) => ellipsis);
    return (
        <div className="bg-[#0D1116] pb-32">
            <section className="w-full pt-24 px-6 z-10">
                <div className="flex flex-wrap mx-auto max-w-7xl justify-between">
                    <div className="z-10">
                        <div className="mt-12">
                            <div className="max-w-2xl">
                            <h2 className="text-base font-semibold leading-7 text-[#F78001]">Generador de CV</h2>
                            <p className="mt-2 text-6xl font-bold tracking-tight font-roboto text-white"
                            style={{'backgroundImage': 'linear-gradient(180deg, #57B33E00 77%, #5643CC 35%)'}}>Es momento de mejorar tu curriculum</p>
                            <p className="mt-6 text-lg leading-8 text-gray-100">
                                Crea un currículum atractivo y profesional en menos de 10 minutos con nuestro generador de pdf. 
                                Logra una buena impresión y aumenta tus posibilidades de conseguir el empleo que aspiras.
                            </p>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <figure className="figure">
                            <img src="https://i.ibb.co/Lzmv5Gm/cvimg.png"/>
                            <figcaption>
                                <h3>Descargar ejemplo</h3>
                            </figcaption>
                            <a href="#" onClick={() => alert("Downloaded")}></a>
                        </figure>
                    </div>
                    
                    
                   {/*  <div className="relative">
                        <Image
                            className="mx-auto md:mr-0"
                            src={cvimg}
                            height={300}
                            alt="cv"
                        />
                        <DownloadSampleBtn
                            onClick={() => alert("Downloaded")}
                        />
                    </div> */}
                </div>
            </section>
            <div className="mt-12 mx-auto max-w-7xl z-10">
                <FormLayout />
            </div>
        </div>
    )
}

export default generarcv
