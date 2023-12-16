import React from 'react';
import defaultUser from '../../public/Talents/defaultUser.jpg'
import uk from '../../public/Talents/uk.png'
import spain from '../../public/Talents/spain.png';
import Image from 'next/image';
import {FaLinkedin}from 'react-icons/fa'

const TalentCards = (props) => {
  return (
  <div className="my-8">
    <div className={props.MainCardsStyle}>
            <div className="flex flex-row justify-between px-2 mt-2">
           <span>{props.Medal}</span>
            <FaLinkedin color="white"/>      
            </div>
        <div className={props.CardColor}>
              <Image src={defaultUser} className={props.ImageColors} alt="profile pic"/>
              <div className="mt-10">
                        <p className="font-bold text-center whitespace-nowrap">{props.name}</p>
                        <p className="text-sm font-semibold text-center">{props.position}</p>
                        <div className="flex flex-row sm:justify-center md:justify-start mt-2">
                          <p className="border border-gray-400 rounded-sm text-xs  whitespace-nowrap px-1 mr-1">{props.seniority}</p>
                          <p className="border border-gray-400 rounded-sm text-xs  whitespace-nowrap px-1">Argentina</p>
                       </div>
              </div>
              <div className="w-full flex  flex-row  items-center py-2">
                  <Image src={uk} alt="English" className="w-4 h-4 mr-2"/> 
                  <Image src={spain} alt="Spanish" className="w-4 h-4 mr-2"/> 
              </div>
              <button type="button" 
              className="text-gray-900 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-2 py-1 text-center justify-end mt-6">
                <p className="font-semibold">Contact</p>
              </button>
        </div>
    </div>
  </div>
  );
};

export default TalentCards;
