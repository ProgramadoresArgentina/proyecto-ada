import { NextPage } from 'next';

const Navbar: NextPage = () => {
    return (
        <div className='flex justify-between mt-8  mr-16 ml-28' >
            <h1>LOGO</h1>
            <div className='flex justify-end items-center'>
                <h1 className='ml-11'>Proyectos</h1>
                <h1 className='ml-11'>Bolsa de talentos</h1>
                <h1 className='ml-11'>Contacto</h1>
                <h1 className='ml-11'>Nosotros</h1>
                <button className="bg-indigo-500  text-white  py-2 px-4 rounded ml-11">
                    Generar mi CV
                </button>
            </div>
        </div>
    )
}

export default Navbar;