import React from 'react'
import { useSlider } from '../../hooks/useSlider'
import { CarouselProps } from '../../interface/carouselTypes'

import CarouselButtons from '../Carousel/CarouselButtons'
import CarouselPagination from '../Carousel/CarouselPagination'
import ProjectsCarouselSlider from './ProjectsCarouselSlider'

export default function ProjectsCarousel({ styles, data, divide, breakpoint }: CarouselProps) {
  const { ref, indexSlider, sizeScreen, handleSlide } = useSlider({ data: data, divide: divide, breakpoint: breakpoint })

  return (
    <div className={`flex gap-8 flex-col items-center justify-center w-full ${styles}`}>
      <div className='group flex justify-center items-center w-full relative xl:overflow-x-hidden'>
        <CarouselButtons breakpoint={breakpoint} sizeScreen={sizeScreen} handleSlide={handleSlide}/>
        <ProjectsCarouselSlider breakpoint={breakpoint} sizeScreen={sizeScreen} innerRef={ref}data={data} />
      </div>
      <CarouselPagination
        breakpoint={breakpoint}
        data={data}
        divide={divide}
        handleSlide={handleSlide}
        indexSlider={indexSlider}
        size={"lg"}
        sizeScreen={sizeScreen}
      />
    </div>
  )
}