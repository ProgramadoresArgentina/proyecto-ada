import { useState } from "react"
import Image from "next/image"
import { useDragAndDropImg } from "../../hooks/useDragAndDropImg"

export default function UpdateCoverImgModal({ handleShowUploadCoverImgModal, handleCoverImgChange }) {
  const [imgPreview, setImgPreview] = useState()
  const { onDrag, handleDragEnter, handleDragLeave, handleDrop } = useDragAndDropImg(setImgPreview)

  const handleImgPreviewChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImgPreview(e.target.files[0])
    }
  }

  return (
    <div
      className='flex items-center justify-center fixed z-50 top-0 left-0 w-full h-full bg-indigo-500 bg-opacity-20'
      onClick={handleShowUploadCoverImgModal}
    >
      <div
        className='flex flex-col gap-4 p-6 animate-fadeInUp shadow-lg rounded-lg bg-white'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-xl tracking-tight'>Agregar imagen de encabezado</h2>
        {imgPreview ? (
          <picture className='w-[30rem] transition-all aspect-[16/6] overflow-hidden rounded-lg'>
            <Image src={URL.createObjectURL(imgPreview)} width={2000} height={2000} alt='header' className='w-full h-full object-cover' />
          </picture>
        ) : (
          <label
            className={`relative flex items-center justify-center w-[30rem] aspect-[16/6] text-sm tracking-tight cursor-pointer p-4 rounded-md border-dashed border-2 border-[#8993A4] text-[#8993A4] bg-[#f8fafc] hover:border-indigo-500 hover:text-indigo-500 
            ${onDrag && 'border-indigo-500 text-indigo-500'}`}
          >
            <input
              accept="image/*"
              className='absolute top-0 left-0 w-full h-full bg-red-200 opacity-0'
              onChange={handleImgPreviewChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              type="file"
            />
            Arrastrar y soltar o click aquí
          </label>
        )}
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <button
              className='button-secundary w-28'
              onClick={handleShowUploadCoverImgModal}
            >
              Cancelar
            </button>
            <button
              className='button-secundary w-28'
              disabled={!imgPreview}
              type="button"
              onClick={() => setImgPreview(undefined)}
            >
              Cambiar
            </button>
          </div>
          <button
            className='button-primary w-28'
            disabled={!imgPreview}
            type="button"
            onClick={() => handleCoverImgChange(imgPreview)}
          >
            Subir
          </button>
        </div>
      </div>
    </div>
  )
}