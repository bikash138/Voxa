import Auth from '@/components/Auth/Auth'
import NavBar from '@/components/NavBar/NavBar'
import React from 'react'

const page = () => {
  return (
    <div>
        {/* <NavBar/> */}
        <Auth isSignin={false}/>
    </div>
  )
}

export default page