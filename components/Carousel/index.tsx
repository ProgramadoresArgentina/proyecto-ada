import Link from 'next/link'

import CarouselButton from './CarouselButton'
import CarouselPagination from './CarouselPagination'
import CarouselSlider from './CarouselSlider'

import { useSlider } from '../../hooks/useSlider'
import { projects } from '../../constants/projects'

export default function Carrousel() {
  const { ref, indexSlider, handleSlide } = useSlider(projects)

  return (
    <section className='bg-background-vector bg-cover bg-center bg-no-repeat font-manrope pt-28 pb-16 flex flex-col gap-8 items-center justify-center'>
      <div className='flex flex-col gap-3 text-center'>
        <h2 className='text-4xl font-bold tracking-tight'>Proyectos de la comunidad</h2>
        <h3 className='text-xl tracking-tight text-[#64607D]'>Descripcion sobre los proyectos</h3>
      </div>
      <div className='group flex justify-center items-center max-w-full relative  xl:overflow-x-hidden xl:max-w-[75rem]'>
        <CarouselButton className='hidden xl:flex' onClick={() => handleSlide({ prev: true })} />
        <CarouselSlider innerRef={ref} data={projects} />
        <CarouselButton className='hidden xl:flex' onClick={() => handleSlide({ next: true })} next />
      </div>
      <CarouselPagination className='hidden xl:block' handleSlide={handleSlide} indexSlider={indexSlider} data={projects} />
      <Link href='#projects' className='px-8 py-4 rounded-xl bg-[#5D5FEF] text-white text-base'>
        Inscribirse a proyectos 🎉
      </Link>
    </section>
  )
}
