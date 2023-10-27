import React from 'react'
import TalentsCard from './TalentCards'
import Marquee from 'react-fast-marquee'
import { FaMedal } from 'react-icons/fa';

const TalentsMarquee = () => {
  return (
    <div className="bg-gradient-to-r from-zinc-900 to-slate-900 w-full h-auto justify-center items-center">
     <div>
      <h1 className="flex justify-center  text-xl font-bold mt-10 text-golden">Destacados del mes</h1>
      {/* cards de destacados */}
            <Marquee speed={30}  pauseOnHover={true} autoFill={true}>
            <TalentsCard
            Medal={<FaMedal color="#ffb703"/>}
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
   
      <h1 className='text-2xl font-bold text-center text-white'>
      Hace realidad tu proximo  <span className='degrade-text'> proyecto</span>
        </h1>
        {/* cards standard */}
        <Marquee speed={10}  pauseOnHover={true} autoFill={true}>
          <TalentsCard
          MainCardsStyle={"max-w-sm rounded overflow-hidden shadow-lg bg-indigo-800 transition-transform transform hover:-translate-y-2 hover:scale-105 mx-6 relative w-200 h-300"}
          CardColor={"bg-white  w-full mt-10 px-5 py-3 flex flex-col justify-between text-black"}
          ImageColors={"w-20 h-20 rounded-full border-4 border-white absolute top-20 left-1/2 transform -translate-x-1/2      -translate-y-1/2"}
          name={"Daniela Martinez"}
          years={"2 yrs"}
          seniority={"Junior"}
          position={"Front-end"}
          />
        </Marquee>
    </div>
  )
}
export default TalentsMarquee
