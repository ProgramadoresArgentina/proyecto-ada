export default function SearchHashtagsFormItem({ title, description, handleAddHashtag }) {
    return (
      <li
        className='px-4 py-2 text-[#f8fafc] cursor-pointer rounded-sm hover:bg-[#f8fafc] hover:text-indigo-500'
        onClick={() => handleAddHashtag(title)}
      >
        <h4 className="text-[#565e69]">{`#${title}`}</h4>
        <p className="text-sm text-[#565e69]">{description}</p>
      </li>
    )
  }