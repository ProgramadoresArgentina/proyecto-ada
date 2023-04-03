import { useRef, useEffect, useState, useCallback } from 'react'
import { handleSlideProps, useSliderProps } from '../interface/carouselTypes'

import { useScroll } from './useScroll'
import { useSizeScreen } from './useSizeScreen'

export const useSlider = ({ data, divide, breakpoint }: useSliderProps) => {
  const ref = useRef(null)
  const [indexSlider, setIndexSlider] = useState(0)
  const { sizeScreen } = useSizeScreen()
  const { scrollLeft } = useScroll(ref)

  const handleSlide = useCallback(
    ({ index, next, prev }: handleSlideProps) => {
      const _sliderElement = ref.current
      if (_sliderElement) {
        if (index >= 0) setIndexSlider(index)
        if (next) {
          if (indexSlider + 1 < Math.ceil(data.length / divide)) setIndexSlider((prev) => prev + 1)
          else setIndexSlider(0)
        }
        if (prev) {
          if (indexSlider - 1 >= 0) setIndexSlider((prev) => prev - 1)
          else setIndexSlider(Math.ceil(data.length / divide) - 1)
        }
      }
    },
    [data, divide, indexSlider]
  )

  useEffect(() => {
    const _sliderElement = ref.current
    if (sizeScreen < breakpoint) {
      const childrenSize = _sliderElement.children[0].clientWidth
      _sliderElement.style.transform = `translateX(-0%)`
      handleSlide({ index: Math.ceil(scrollLeft / childrenSize) - 1 })
    } else _sliderElement.style.transform = `translateX(-${indexSlider}00%)`
  }, [indexSlider, sizeScreen, scrollLeft, handleSlide, breakpoint])

  return { ref, divide, indexSlider, sizeScreen, handleSlide }
}
