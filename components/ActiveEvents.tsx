
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Marquee from 'react-fast-marquee';


const marqueeVariants = {
  animate: {
    x: [-600,600],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 12,
        ease: "linear",
      },
    },
  },
};
function ActiveEvents() {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    fetch('api/events')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div >
     <div  className='w-full flex justify-around'>
      <Marquee speed={100} gradient={false} autoFill={true}>
      <div className=''>
        <span>No te pierdas los proximos eventos!⚡ </span>
        <span>No te pierdas los proximos eventos ⚡ </span>
        <span>No te pierdas los proximos eventos ⚡ </span>
        <span>No te pierdas los proximos eventos ⚡ </span>
        <span>No te pierdas los proximos eventos ⚡ </span>
      </div>
      </Marquee>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occurred: {error.message}</p>
      ) : (
        <div>
          <h1>Title:{data.title}</h1>
        </div>
      )}
    </div>
  );
}

export default ActiveEvents;
