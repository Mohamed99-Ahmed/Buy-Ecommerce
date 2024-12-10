import React from 'react'
import notFound from '../../assets/images/notfound.svg'

export default function NotFound() {
  return (
    <>
        <div className='flex items-center justify-center'>
          <img src={notFound} className='w-full max-h-screen' alt="" />
        </div>
    </>
  )
}
