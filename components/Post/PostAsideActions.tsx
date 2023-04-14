import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Image from 'next/image'
import PostActionsAlert from './PostActionsAlert'
import { UserType } from '../../interface/userTypes'

export default function PostAsideActions({ linkedIn, facebook, twitter }: UserType) {
  const [showPopup, setShowPopup] = useState<string>('')

  const handleCopyLink = () => {
    setShowPopup('El enlace se ha copiado en el portapapeles')
    setTimeout(() => {
      setShowPopup('')
    }, 4000)
  }

  const handleSavePost = () => {
    setShowPopup('Guardado')
    setTimeout(() => {
      setShowPopup('')
    }, 4000)
  }

  return (
    <div className='flex w-full items-center pb-8 justify-end gap-6 '>
      <a href={linkedIn} title='LinkedIn' className='hover:brightness-50 transition-opacity' target='_blank' rel='noreferrer'>
        <Image src='/icons/LinkedIn.svg' width={100} height={100} alt='LinkedIn' className='w-5' />
      </a>
      <a href={facebook} title='Facebook' className='hover:brightness-50 transition-opacity' target='_blank' rel='noreferrer'>
        <Image src='/icons/Facebook.svg' width={100} height={100} alt='Facebook' className='w-5' />
      </a>
      <a href={twitter} title='Twitter' className='hover:brightness-50 transition-opacity' target='_blank' rel='noreferrer'>
        <Image src='/icons/Twitter.svg' width={100} height={100} alt='Twitter' className='w-5' />
      </a>
      <CopyToClipboard text={location.href}>
        <button onClick={handleCopyLink} title='Compartir' className=' transition-opacity relative flex items-center justify-center z-10'>
          <Image src='/icons/url.svg' width={100} height={100} alt='Copy URL' className='w-5 hover:brightness-50' />
        </button>
      </CopyToClipboard>
      <hr className='h-4 w-0.5 bg-[#A8A8A8] border-none' />
      <button onClick={handleSavePost} title='Guardar' className=' transition-opacity relative flex items-center justify-center z-10'>
        <Image src='/icons/Save.svg' width={100} height={100} alt='Save' className='w-4 hover:brightness-50' />
      </button>
      {showPopup && <PostActionsAlert>{showPopup}</PostActionsAlert>}
    </div>
  )
}
