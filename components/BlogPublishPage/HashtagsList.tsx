import XmarkIcon from "../Icons/XmarkIcon"

export default function HashtagsList({ hashtags, handleRemoveHashtag }: any) {
  return (
    <ul className='flex gap-4 flex-wrap'>
      {hashtags.map((hashtag, index) => (
        <li
          key={`hasttag-${index}`}
          className='flex gap-2 px-3 py-1 rounded-md text-[#565e69] bg-indigo-50'
        >
          <span>{`#${hashtag}`}</span>
          {handleRemoveHashtag && (
            <button
              type="button"
              className="flex items-center justify-center hover:text-red-500"
              onClick={() => handleRemoveHashtag(hashtag)}
            >
              <XmarkIcon width='.75rem' />
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}