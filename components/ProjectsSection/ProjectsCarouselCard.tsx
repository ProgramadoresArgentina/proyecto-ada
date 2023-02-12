import Link from 'next/link'
import Image from 'next/image'
import { CarouselProjectsCardProps } from '../../interface/carouselTypes'

export default function ProjectsCarouselCard({ id, imageUrl, title, description, url }: CarouselProjectsCardProps) {
  return (
    <div className='flex flex-col snap-center bg-white w-[23rem] min-w-[23rem] rounded-2xl pb-10 px-6 mt-[4rem]'>
      <Image src={imageUrl} alt='layout' width={180} height={180} className='m-auto translate-y-[-4rem] w-[14rem]' />
      <div className='flex flex-col gap-2'>
        <h3 className='font-extrabold text-2xl tracking-tight text-[#16012C]'>{title + id}</h3>
        <p className='text-base font-medium leading-7 text-[#64607D]'>{description}</p>
        {url && <Link href={url} className='text-[#01966B] font-bold'>
          Leer mas &rarr;
        </Link>}
      </div>
    </div>
  )
}