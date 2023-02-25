import { CarouselPaginationProps } from '../../interface/carouselTypes'

export default function CarouselPagination({ breakpoint, data, divide, handleSlide, indexSlider, size, sizeScreen }: CarouselPaginationProps) {
  return (
    <div className={`flex gap-3 ${size === 'lg' && 'lg:gap-4'}`}>
      {data.map(({}, index: number) => {
        if (index % divide == 0)
          return (
            <button
              disabled={sizeScreen < breakpoint}
              key={index}
              onClick={() => handleSlide({ index: index / divide })}
              className={`rounded-full w-2 h-2 ${size === 'lg' && 'lg:w-3 lg:h-3'} ${index / divide === indexSlider ? 'bg-[#2639ED]' : 'bg-[#E7F0FC]'}`}
            ></button>
          )
      })}
    </div>
  )
}
