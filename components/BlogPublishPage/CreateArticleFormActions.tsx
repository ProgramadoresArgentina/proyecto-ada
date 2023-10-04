import Image from 'next/image'

import ImgIcon from '../Icons/ImgIcon'
import HashtagIcon from '../Icons/HashtagIcon'
import XmarkIcon from '../Icons/XmarkIcon'

import SearchHashtagsForm from './SearchHashtagsForm'
import HashtagsList from './HashtagsList'

export default function CreateArticleFormActions({
  coverImagePreview,
  handleAddHashtag,
  handleCoverImgChange,
  handleRemoveHashtag,
  handleShowSearchHashtagsForm,
  handleShowUploadCoverImgModal,
  handleTitleValueChange,
  hashtagsPreview,
  showSearchHashtagsForm,
  textareaRef,
  titleValue,
}) {
  return (
    <div className='px-6 pt-4 flex flex-col gap-3 group'>
        {coverImagePreview && (
        <picture className='w-full transition-all aspect-[16/6] mb-6 mt-2 overflow-hidden rounded-xl h-[150px]'>
            <Image src={coverImagePreview} width={2000} height={2000} alt='header' className='w-full h-full object-cover' />
        </picture>
        )}
      <div className={`flex w-full gap-2 group-hover:opacity-100 ${showSearchHashtagsForm && 'opacity-100'}`} >
        {coverImagePreview ?
          <button
            className='flex items-center justify-center gap-2 px-2.5 py-0.5 font-semibold cursor-pointer text-[#FFF] tracking-tight rounded-md transition-colors hover:text-indigo-500 hover:bg-indigo-100 active:bg-indigo-300'
            onClick={() => handleCoverImgChange(null)}
            type='button'
          >
            <XmarkIcon width="1rem" /> Eliminar imagen de encabezado
          </button>
          : <button
            className='flex items-center justify-center gap-2 px-2.5 py-0.5 font-semibold cursor-pointer text-[#FFF] tracking-tight rounded-md transition-colors hover:text-indigo-500 hover:bg-indigo-100 active:bg-indigo-300'
            onClick={handleShowUploadCoverImgModal}
            type='button'
          >
            <ImgIcon width="1rem" /> Agregar imagen de encabezado
          </button>
        }
        <div className='relative'>
          <button
            className='flex items-center justify-center gap-2 px-2.5 py-0.5 font-semibold cursor-pointer text-[#FFF] tracking-tight rounded-md transition-colors hover:text-indigo-500 hover:bg-indigo-100 active:bg-indigo-300'
            onClick={handleShowSearchHashtagsForm}
            type='button'
          >
            <HashtagIcon width="1rem" /> Agregar hashtags
          </button>
          {showSearchHashtagsForm && (
            <SearchHashtagsForm
              handleAddHashtag={handleAddHashtag}
              handleShowSearchHashtagsForm={handleShowSearchHashtagsForm}
              hashtagsPreview={hashtagsPreview}
            />
          )}
        </div>
      </div>
      {hashtagsPreview.length > 0 && (
        <HashtagsList hashtags={hashtagsPreview} handleRemoveHashtag={handleRemoveHashtag} />
      )}
      <textarea
        autoFocus
        className='w-full max-w-full text-5xl resize-none font-semibold placeholder:text-[#8993A4] m-[0_auto] block outline-none bg-transparent'
        onChange={handleTitleValueChange}
        placeholder='Agrega el título del articulo'
        ref={textareaRef}
        rows={1}
        value={titleValue}
      />
    </div>
  )
}