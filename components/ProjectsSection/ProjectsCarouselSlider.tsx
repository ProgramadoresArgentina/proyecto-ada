import { CarouselSliderProps } from '../../interface/carouselTypes'
import ProjectsCarouselCard from './ProjectsCarouselCard'

export default function ProjectsCarouselSlider({ innerRef, data, sizeScreen, breakpoint }: CarouselSliderProps) {
    return (
      <div
        ref={innerRef}
        className={`flex gap-8 justify-start  items-center w-full transition-transform duration-500 
        ${sizeScreen > breakpoint ? 'px-4 overflow-visible snap-none' : 'px-8 snap-x overflow-x-scroll no-scrollbar'}`}
      >
        {data.map(({ id, imageUrl, title, description, url }: any) => (
          <ProjectsCarouselCard key={id} id={id} imageUrl={imageUrl} title={title} description={description} url={url} />
        ))}
      </div>
    )
}