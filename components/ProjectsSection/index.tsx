import Link from 'next/link'
import { data } from '../../data/projects'
import { useSizeScreen } from '../../hooks/useSizeScreen'

import ProjectsCarousel from './ProjectsCarousel'

const BREAKPOINT = 1280

export default function ProjectsSection() {
  const { sizeScreen } = useSizeScreen()
  const divide = sizeScreen < BREAKPOINT ? 1 : 3

  return (
    <section className='bg-cover bg-center bg-no-repeat font-manrope pt-28 pb-16 flex flex-col gap-8 items-center justify-center'>
      <div className='flex flex-col gap-3 text-center mb-10'>
            <h2 className='text-4xl text-secondary font-bold tracking-tight'>Últimos proyectos de la comunidad</h2>
      </div>
      <ProjectsCarousel styles='w-full xl:max-w-[75rem]' data={data} divide={divide} breakpoint={BREAKPOINT} />
      <Link href='#projects' className='px-8 py-4 rounded-xl bg-[#5D5FEF] text-white text-base'>
        Inscribirse a proyectos 🎉
      </Link>
    </section>
  )
}
