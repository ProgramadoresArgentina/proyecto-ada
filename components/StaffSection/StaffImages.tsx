import React from 'react'
import Image from 'next/image'

import { staff } from '../../data/staff'

"w-[4.5rem] top-0 left-[25%]"

const STYLES = ["w-[4rem] top-[5%] left-[60%]", "w-[6.5rem] bottom-[5%] right-[35%]", "w-[8rem] top-[22%] right-[30%]", "w-[4rem] top-1/3 right-[5%]","w-[6.5rem] top-[25%] left-0", "w-[4.75rem] top-[60%] left-[10%]","w-[4.5rem] top-0 left-[25%]", "w-[4.75rem] bottom-[22%] right-[15%]", "w-[2.5rem] top-[10%] left-[10%]", "w-[2.5rem] bottom-[35%] right-0", "w-[3rem] top-[15%] right-0",  "w-[2.5rem] bottom-[35%] left-[30%]" ]

export default function StaffImages() {
  
  return (
    <div className='relative h-full aspect-square float-right'>
      <Image src='/staff/ellipse93.svg' alt='deco' width={160} height={160} className='absolute w-[11.5rem] top-1/4 left-[10%]' />
      {staff.map(({imgUrl, name, id,}, index) => 
          <Image src={imgUrl} alt={name} title={name} key={id} width={1000} height={1000} className={`absolute rounded-full ${STYLES[index]}`} />
        )}
    </div> 
  )
}
