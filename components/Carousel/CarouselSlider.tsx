import CarouselCard from './CarouselCard'

export default function CarouselSlider({ innerRef, data }) {
  return (
    <div
      ref={innerRef}
      className={`flex gap-8 justify-start px-8 snap-x overflow-x-scroll items-center w-full transition-transform duration-500 xl:px-4 xl:overflow-visible xl:snap-none`}
    >
      {data.map(({ id, imageUrl, title, description, url }) => (
        <CarouselCard key={id} id={id} imageUrl={imageUrl} title={title} description={description} url={url} />
      ))}
    </div>
  )
}
