import React from 'react'
import CarouselButton from './CarouselButton'

export default function CarouselButtons({breakpoint, sizeScreen, handleSlide}) {
  return (
    <>
      <CarouselButton breakpoint={breakpoint} sizeScreen={sizeScreen} onClick={() => handleSlide({ prev: true })} />
      <CarouselButton breakpoint={breakpoint} sizeScreen={sizeScreen} onClick={() => handleSlide({ next: true })} next />
    </>
  )
}
