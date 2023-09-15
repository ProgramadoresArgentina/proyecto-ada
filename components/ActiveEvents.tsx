import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import Link from 'next/link';

 const ActiveEvents: React.FC =()=>{
 
  const [data, setData] = useState(null);
  
  const marqueeStyles:React.CSSProperties = {
    width:"100%",
    height:"20%"
};

  useEffect(() => {
    // Fetch data when the component mounts
    fetch('api/events')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.log(error)
      });
  }, []);
//format date that comes from database
const formatDate=(rawDate:Date)=>{
    const newDate = new Date(rawDate);
    const localDate = newDate.toLocaleDateString();
    return localDate;
  }
  return (
     <div  className='w-full flex justify-around'>
       <Marquee speed={50} gradient={true}
        gradientColor={[70, 56, 202]} autoFill={true} pauseOnHover={true}
        style={marqueeStyles}
        >
     { data?.map((item:any)=>(
        <Link href={item.link} key={item.id} className='mx-6 text-white'>
          {item.title} el día  {formatDate(item.expiredAt)}
        </Link>
      ))}
      </Marquee>
    </div>
  );
}

export default ActiveEvents