import React from 'react'
import TalentsMarquee from '../components/TalentsSection/TalentsMarquee'
import TalentsGrid from '../components/TalentsSection/TalentsGrid'

const  talents=() =>{
  const cardData = [
    {
      "id": 1,
      "title": "Card 1",
      "description": "This is the description for Card 1.",
      "imageUrl": "https://example.com/card1.jpg"
    },
    {
      "id": 2,
      "title": "Card 2",
      "description": "This is the description for Card 2.",
      "imageUrl": "https://example.com/card2.jpg"
    },
    {
      "id": 3,
      "title": "Card 3",
      "description": "This is the description for Card 3.",
      "imageUrl": "https://example.com/card3.jpg"
    },
    {
      "id": 4,
      "title": "Card 4",
      "description": "This is the description for Card 4.",
      "imageUrl": "https://example.com/card4.jpg"
    },
    {
      "id": 5,
      "title": "Card 5",
      "description": "This is the description for Card 5.",
      "imageUrl": "https://example.com/card5.jpg"
    },
    {
      "id": 6,
      "title": "Card 6",
      "description": "This is the description for Card 6.",
      "imageUrl": "https://example.com/card6.jpg"
    },
    {
      "id": 7,
      "title": "Card 7",
      "description": "This is the description for Card 7.",
      "imageUrl": "https://example.com/card7.jpg"
    },
    {
      "id": 8,
      "title": "Card 8",
      "description": "This is the description for Card 8.",
      "imageUrl": "https://example.com/card8.jpg"
    }
  ]

  return (
    <div className="w-full py-6 bg-gradient-to-r from-zinc-900 to-slate-900 mt-12">
       <h1 className="text-4xl font-bold text-center text-white">Bolsa de 
      <span className="degrade-text"> talentos</span>
        </h1>
        {/* talentos destacados */}
    <TalentsMarquee/> 
    {/* perfiles standard  */}
    <TalentsGrid />
    </div>
  )
}
export default talents