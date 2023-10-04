import { CREATE_ARTICLE_ERROR_TYPES } from "../../constants/constants"

export default function ErrorModal({ error, handleClearError, handleTitleValueChange, handleSubmit, titleValue }) {
  return (
    <div
      className='flex items-center justify-center fixed z-50 top-0 left-0 w-full h-full bg-indigo-500 bg-opacity-20'
      onClick={handleClearError}
    >
      <div
        className='flex flex-col gap-3 p-6 animate-fadeInUp shadow-lg rounded-lg w-96 bg-white'
        onClick={(e) => e.stopPropagation()}
      >
        {error.type === CREATE_ARTICLE_ERROR_TYPES.TITLE_REQUIRED && (
          <>
            <h1 className="text-xl tracking-tight leading-4 m-0">Este articulo necesita un titulo</h1>
            <p className="text-[#565e69] text-sm">Antes de publicar, por favor, agrega un titulo</p>
            <input
              autoFocus
              className='w-full max-w-full px-2 py-1 border-solid border-[#b6bcc7] border-2 rounded-md bg-[#f8fafc] resize-none font-semibold placeholder:text-[#8993A4] m-[0_auto] block outline-none'
              onChange={handleTitleValueChange}
              placeholder='Agrega el título del articulo'
              value={titleValue}
            />
            <div className="flex items-center gap-4 justify-end mt-2">
              <button
                className='button-secundary'
                type="button"
                onClick={handleClearError}
              >
                Cerrar
              </button>
              <button
                className='button-primary'
                onClick={(e) => {
                  handleClearError()
                  handleSubmit(e)
                }}
                disabled={!titleValue}
              >
                Publicar
              </button>
            </div>
          </>
        )}
      </div>
    </div >
  )
}