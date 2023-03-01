import React from 'react'

import { useSlider } from '../../hooks/useSlider'
import { staff } from '../../data/staff'

import StaffCarouselCard from './StaffCarouselCard'
import CarouselButtons from '../Carousel/CarouselButtons'
import CarouselPagination from '../Carousel/CarouselPagination'

const BREAKPOINT = 1280

export default function StaffCarousel() {
  const { ref, indexSlider, sizeScreen, handleSlide } = useSlider({ data: staff, divide: 1, breakpoint: BREAKPOINT })

  return (
    <div className='group flex justify-center items-center w-full h-full overflow-hidden relative '>
      <CarouselButtons breakpoint={BREAKPOINT} sizeScreen={sizeScreen} handleSlide={handleSlide} />
      <div
        ref={ref}
        className={`flex items-center justify-start w-full h-full
      ${sizeScreen > BREAKPOINT ? 'overflow-visible' : 'snap-x overflow-x-scroll no-scrollbar gap-8'}`}
      >
        {staff.map(({ id, imgUrl, name, position, github }: any) => (
          <StaffCarouselCard
            github={github}
            imgUrl={imgUrl}
            innerRef={ref}
            key={id}
            name={name}
            position={position}
          />
        ))}
      </div>
      <div className={`absolute ${ sizeScreen > BREAKPOINT ? "top-[70%] right-[10%]" : "bottom-0"}`}>
        <CarouselPagination indexSlider={indexSlider} sizeScreen={1000} breakpoint={600} data={staff} divide={1} handleSlide={handleSlide} />
      </div>
    </div>
  )
}
