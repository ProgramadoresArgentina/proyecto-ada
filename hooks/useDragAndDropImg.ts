import { useState } from "react"

export const useDragAndDropImg = (setState) => {
  const [onDrag, setOnDrag] = useState(false)

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setOnDrag(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setOnDrag(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setOnDrag(false)
    setState(e.dataTransfer.files[0])
  }

  return { onDrag, handleDragEnter, handleDragLeave, handleDrop }
}