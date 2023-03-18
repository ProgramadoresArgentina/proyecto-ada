import React from 'react'
import Image from 'next/image'

import StaffCarousel from './StaffCarousel'
import StaffImages from './StaffImages'

export default function StaffSection() {
  return (
    <section className='font-manrope py-16 flex flex-col gap-12 sm:gap-24 items-center justify-center'>
      <div className='flex flex-col gap-3 text-center'>
        <h2 className='text-4xl font-bold tracking-tight'>Staff</h2>
        <h3 className='text-xl tracking-tight text-[#757575]'>La comunidad no sería posible sin ellos</h3>
      </div>
      <div className='flex w-full items-center justify-center max-w-7xl'>
        <div className='w-full sm:w-[36rem] h-[14rem] sm:h-[23rem] xl:h-[24rem] relative xl:w-[60%]'>
          <Image
            alt='deco'
            className='w-[8.75rem] h-[6.25rem] sm:w-[12.25rem] sm:h-[9.75rem] absolute top-[-10%] left-[30%] -z-50'
            height={600}
            src='/staff/dot.svg'
            width={600}
          />
          <Image
            alt='deco'
            className='w-[5rem] h-[5rem] sm:w-[7.5rem] sm:h-[7.5rem] absolute left-[10%] sm:left-0 bottom-[10%] sm:bottom-0 -z-50'
            height={600}
            src='/staff/ellipse94.svg'
            width={600}
          />
          <div className='hidden xl:block w-[24rem] aspect-square absolute rounded-l-full rounded-br-full shadow-[10px_20px_50px_rgba(0,0,0,0.10)]' />
          <StaffCarousel />
        </div>
        <div className='hidden w-[40%] h-[14rem] sm:h-[23rem] xl:h-[24rem] lg:block'>
          <StaffImages />
        </div>
      </div>
    </section>
  )
}
