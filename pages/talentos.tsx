import React from 'react'
import TalentsMarquee from '../components/TalentsSection/TalentsMarquee'

const  talents=() =>{
  return (
    <div className="w-full py-6 bg-gradient-to-r from-zinc-900 to-slate-900 mt-12">
       <h1 className="text-4xl font-bold text-center text-white">Bolsa de 
      <span className="degrade-text"> talentos</span>
        </h1>
    <TalentsMarquee/>    
    </div>
  )
}
export default talents