import React from 'react'
import TalentsMarquee from '../components/TalentsSection/TalentsMarquee'
import TalentsGrid from '../components/TalentsSection/TalentsGrid'

const talents = () => {

  return (
    <div className="w-full py-6 bg-gradient-to-r from-zinc-900 to-slate-900 mt-12">
      <h1 className="text-4xl font-bold text-center text-white mt-10">Bolsa de
        <span className="degrade-text"> talentos</span>
      </h1>
      {/* talentos destacados */}
      <TalentsMarquee />
      {/* perfiles standard  */}
      <TalentsGrid />
    </div>
  )
}
export default talents