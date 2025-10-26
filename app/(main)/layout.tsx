import React from 'react'
import Navbar from './components/navbar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col w-full'>
      <Navbar />
      {children}
    </div>
  )
}
