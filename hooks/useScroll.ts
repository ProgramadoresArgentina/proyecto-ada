import { MutableRefObject, useCallback, useEffect, useState } from 'react'

export const useScroll = (ref: MutableRefObject<any>) => {
  const [scrollData, setScrollData] = useState({ scrollHeight: 0, scrollLeft: 0, scrollTop: 0, scrollWidth: 0 })

  const handleScroll = useCallback(() => {
    const _element = ref.current
    setScrollData({
      scrollHeight: _element.scrollHeight,
      scrollLeft: _element.scrollLeft,
      scrollTop: _element.scrollTop,
      scrollWidth: _element.scrollWidth,
    })
  }, [ref])

  useEffect(() => {
    handleScroll()
    const _element = ref.current
    _element.addEventListener('scroll', handleScroll)
    return () => _element.removeEventListener('scroll', handleScroll)
  }, [ref, handleScroll])

  return scrollData
}
