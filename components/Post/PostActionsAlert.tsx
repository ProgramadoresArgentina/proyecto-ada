export default function PostActionsAlert({ children }) {
  return (
    <div className='bg-white w-max tracking-tighter flex items-center justify-center fixed animate-showAlertPopup px-6 py-3 left-6 bottom-6 shadow-xl text-base text-[#535353] rounded-2xl font-semibold border-[1px] border-solid border-[#c5c5c5]'>
      {children}
    </div>
  )
}
