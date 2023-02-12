import { useRef, useEffect, useState, useCallback } from 'react'

export const useSlider = (data: any) => {
  const ref = useRef(null)
  const [indexSlider, setIndexSlider] = useState(0)

  const handleSlide = useCallback(
    ({ index, next, prev }: { index?: number; next?: boolean; prev?: boolean }) => {
      if (ref.current) {
        if (index >= 0) setIndexSlider(index)
        if (next) {
          if (indexSlider + 1 < Math.ceil(data.length / 3)) setIndexSlider((prev) => prev + 1)
          else setIndexSlider(0)
        }
        if (prev) {
          if (indexSlider - 1 >= 0) setIndexSlider((prev) => prev - 1)
          else setIndexSlider(Math.ceil(data.length / 3) - 1)
        }
      }
    },
    [indexSlider, data]
  )

  useEffect(() => {
    ref.current.style.transform = `translateX(-${indexSlider}00%)`
  }, [indexSlider])

  useEffect(() => {
    setInterval(() => {
      handleSlide({ next: true })
    }, 5000)
  }, [handleSlide])

  return { ref, indexSlider, handleSlide }
}
