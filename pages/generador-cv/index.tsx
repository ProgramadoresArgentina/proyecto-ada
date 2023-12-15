import ellipsis from '../../public/form/Ellipse 48.png';
import FormLayout from '../../components/FormComponents/FormLayout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { wrapper } from '../../store/store';
import { useEffect, useState } from 'react';
import { launchToast } from '../../helpers/launchToast';
import Link from 'next/link';

const Generarcv = () => {
    const [loading, setLoading] = useState(false);
    const [cvList, setCvList] = useState([]);
    const dots = Array.from({ length: 80 }, (_, index) => ellipsis);

    useEffect(() => {
        getCVList();
    }, [])

    function getCVList() {
        setLoading(true);
        fetch('/api/resume')
            .then(response => {
                if (response.status !== 200) throw Error();
                return response.json()
            })
          .then(data => {
            setCvList(data);
            setLoading(false);
        })
          .catch(error => {
            launchToast("error","Error al cargar lista de cv, intentelo nuevamente.");
        });
    }

    return (
        <div className="bg-[#0D1116] pb-32">
            <section className="w-full pt-24 px-6 z-10">
                <div className="flex flex-wrap mx-auto max-w-7xl justify-between">
                    <div className="z-10">
                        <div className="md:mt-12">
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
                </div>
            </section>
            <div className="mt-12 mx-auto max-w-7xl z-10">
                {
                    loading ?
                    <div className="flex items-center justify-center gap-5">
                        <div className="w-5 h-5 aspect-square rounded-full border-4 border-solid border-l-indigo-500 border-t-indigo-500 animate-spin"></div>
                        <span className='text-white'>Cargando tu lista de CV..</span>
                    </div>
                    :
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">

                        {
                            cvList.length === 0 &&
                            <Link className='bg-[#1D232A] h-10 flex items-center justify-center rounded-lg text-5xl text-white
                            flex-col cursor-pointer hover:bg-[#252a30] border py-10'
                            href="/generador-cv/0">
                                <small className='text-sm uppercase font-bold'
                                style={{'backgroundImage': 'linear-gradient(180deg, #57B33E00 77%, #5643CC 35%)'}}>Crear Nuevo CV</small>
                            </Link>
                        }
                        {
                            cvList.map((cv, i) => (
                                <Link className='bg-[#1D232A] h-10 flex items-center justify-center rounded-lg text-md text-white hover:underline
                                flex-col cursor-pointer hover:bg-[#252a30] gap-6' key={i}
                                href={`/generador-cv/${cv.id}`}>
                                    {cv.title}
                                </Link>
                            ))
                        }
                    </div>
                }
                {/* <FormLayout /> */}
            </div>
        </div>
    )
}


export default withPageAuthRequired(wrapper.withRedux(Generarcv), {
    returnTo: '/generador-cv'
});


