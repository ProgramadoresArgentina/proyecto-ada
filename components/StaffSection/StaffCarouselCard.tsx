import React from 'react'
import Image from 'next/image'

export default function StaffCarouselCard({ imgUrl, name, position, innerRef, github }) {
  return (
    <div className='flex items-start px-1 sm:px-0 justify-center snap-center w-full h-full min-w-full gap-4 sm:items-center sm:justify-start sm:min-w-[36rem] sm:gap-10 xl:min-w-[48rem] xl:gap-16'>
      <Image
        src={imgUrl}
        alt={name}
        title={name}
        width={1000}
        height={1000}
        className='rounded-l-full rounded-br-full w-[12rem] sm:w-[20rem] xl:w-[24rem]'
      />
      <div className='flex flex-col gap-8'>
        <div ref={innerRef} className='flex flex-col gap-2 flex-wrap '>
          <h2 className='font-medium text-xl sm:text-2xl'>{name}</h2>
          <h3 className='text-sm sm:text-base tracking-tight text-[#757575]'>{position}</h3>
          <a
            href={`https://github.com/${github}`}
            target='_blank'
            rel='noreferrer'
            className='text-sm sm:text-base w-max tracking-tight text-[#757575] hover:text-[#222222]'
          >
            @{github}
          </a>
        </div>
      </div>
    </div>
  )
}
