import React from 'react'
import TalentsCard from './TalentCards'
import Marquee from 'react-fast-marquee'
import { FaMedal } from 'react-icons/fa';
import { VscVerifiedFilled } from "react-icons/vsc";
{/* cards de talentos destacados */ }
const TalentsMarquee = () => {
  return (
    <div className="bg-gradient-to-r from-zinc-900 to-slate-900 w-full h-auto justify-center items-center">
      <div>
        <div className="flex items-center justify-center bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-500 text-white font-semibold py-1 px-2 w-1/6 mx-6 mt-16 rounded-lg">
          <p className='mr-2'>Miembros verificados</p>
          <VscVerifiedFilled color="white" size={16} />
        </div>

        <Marquee speed={30} pauseOnHover={true} autoFill={true}>
          <TalentsCard
            Medal={<FaMedal color="#ffb703" />}
            MainCardsStyle={"max-w-sm rounded overflow-hidden shadow-lg bg-black transition-transform transform hover:-translate-y-2 hover:scale-105 mx-6 relative hover:shadow-[0_0_1px_#fff,inset_0_0_1px_#fff,0_0_2px_#ffb400,0_0_4px_#ffb400,0_0_10px_#ffb400]"}
            CardColor={"bg-gradient-to-r from-slate-900 to-zinc-900  w-full mt-10 px-8 py-6 flex flex-col text-white"}
            ImageColors={"w-20 h-20 rounded-full border-4 border-golden absolute top-20 left-1/2 transform -translate-x-1/2      -translate-y-1/2"}
            years={"2 yrs"}
            name={"Daniela Martinez"}
            seniority={"Junior"}
            position={"Front-end"}
          />
        </Marquee>
      </div>
    </div>
  )
}
export default TalentsMarquee
