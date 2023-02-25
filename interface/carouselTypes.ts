export interface CarouselProps {
  breakpoint: number
  data: object[]
  divide: number
  styles?: string
}

export interface CarouselSliderProps {
  breakpoint: number
  data: object[]
  innerRef: React.MutableRefObject<any>
  sizeScreen: number
}

export interface CarouselProjectsCardProps {
  description: string
  id: number
  imageUrl: string
  title: string
  url: string
}

export interface CarouselPaginationProps {
  breakpoint: number
  data: object[]
  divide: number
  handleSlide: Function
  indexSlider: number
  size?: "sm" | "lg" 
  sizeScreen: number
}

export interface CarouselButtonProps {
  breakpoint: number
  next?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  sizeScreen: number
  styles?: string
}

export interface useSliderProps {
  breakpoint: number
  data: object[]
  divide: number
}

export interface handleSlideProps {
  index?: number
  next?: boolean
  prev?: boolean
}
