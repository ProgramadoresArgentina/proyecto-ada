import XmarkIcon from '../Icons/XmarkIcon'
import SearchHashtagsFormItem from './SearchHashtagsFormItem'
import { useAutocompleteForm } from '../../hooks/useAutocompleteForm'

export default function SearchHashtagsForm({ hashtagsPreview, handleAddHashtag, handleShowSearchHashtagsForm }) {
  const { autocompleteState, inputRef, panelRef, formProps, inputProps, panelProps, listProps } = useAutocompleteForm()

  return (
    <form
      className='absolute animate-fadeInDown z-20 top-[calc(100%_+_0.5rem)] -left-1/2 flex flex-col w-96 max-h-96 overflow-y-auto gap-2 p-2 shadow-lg rounded-lg bg-white'
      {...formProps}
    >
      <input
        className='px-4 py-2 text-lg rounded-sm outline-none'
        ref={inputRef}
        {...inputProps}
      />
      <button
        className='absolute flex items-center justify-center w-6 rounded-full aspect-square top-[1.15rem] right-5 bg-white text-[#565e69] hover:bg-indigo-50'
        onClick={handleShowSearchHashtagsForm}
        type='button'
      >
        <XmarkIcon width='.75rem' />
      </button>
      {autocompleteState.isOpen && (
        <div ref={panelRef} {...panelProps}>
          {autocompleteState.collections.map((collection, index) => {
            const { items } = collection
            return <section key={`hashtag-${index}`}>
              {items.length > 0 && (
                <ul {...listProps}>
                  {items.filter(item => !hashtagsPreview.includes(item.title))
                    .map(item => (
                      <SearchHashtagsFormItem key={item.id} {...item} handleAddHashtag={handleAddHashtag} />
                    ))}
                </ul>
              )}
            </section>
          })}
        </div>
      )}
    </form >
  )
}
