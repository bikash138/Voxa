import React from 'react'

const NavBar = () => {
  return (
    <div className='w-full flex h-14 justify-between px-4 bg-black text-white mt-4'>
      <div className='flex items-center justify-center'>
        <h1>Voxa</h1>
      </div>
      <div className='bg-gray-900 flex items-center justify-center gap-x-5  px-5 rounded-full'>
        <p>Home</p>
        <p>Dashboard</p>
        <p>FAQs</p>
      </div>
      <div className='px-8 bg-gray-900 flex items-center justify-center rounded-full'>
        <p>Login</p>
      </div>
    </div>
  )
}

export default NavBar