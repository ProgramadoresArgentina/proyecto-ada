import { CarouselButtonProps } from '../../interface/carouselTypes'

export default function CarouselButton({ sizeScreen, breakpoint, onClick, next }: CarouselButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`opacity-0 group-hover:opacity-100 transition-all flex-col items-center justify-center w-16 h-16 text-lg font-extrabold hover:bg-slate-200 hover:bg-opacity-50 absolute z-10 rounded-full 
      ${next ? 'right-0' : 'left-0'} 
      ${sizeScreen < breakpoint ? 'hidden' : 'flex'}`}
    >
      <span
        className={`w-[10px] h-[2px] bg-[#444] 
        ${next ? '-translate-y-[2px] translate-x-0.5 rotate-45' : '-translate-y-[2px] -translate-x-0.5 -rotate-45'}`}
      />
      <span
        className={`w-[10px] h-[2px] bg-[#444] 
        ${next ? 'translate-y-[2px] translate-x-0.5 -rotate-45' : 'translate-y-[2px] -translate-x-0.5 rotate-45'}`}
      />
    </button>
  )
}
