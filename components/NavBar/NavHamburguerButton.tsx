import { NavHamburguerProps } from '../../interfaces'

export default function NavHamburguerButton({ active, onClick }: NavHamburguerProps) {
  return (
    <button className='flex flex-col justify-around items-center relative z-10 w-[24px] h-[24px] md:hidden' onClick={onClick}>
      <span className={`w-full bg-black h-0.5 transition-all rounded-sm ${active && 'translate-y-[8px] rotate-[-45deg]'}`} />
      <span className={`w-full bg-black h-0.5 transition-all rounded-sm ${active && 'w-0'}`} />
      <span className={`w-full bg-black h-0.5 transition-all rounded-sm ${active && 'translate-y-[-8px] rotate-[45deg]'}`} />
    </button>
  )
}
