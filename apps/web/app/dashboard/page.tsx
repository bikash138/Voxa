'use client'
import Dashboard from '@/components/Dashboard/Dashboard'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [isSignedin, setIsSignedIn] = useState<boolean | null>(null)
  useEffect(()=>{
    const token = localStorage.getItem('token')
    token ? setIsSignedIn(true) : setIsSignedIn(false)
  },[])

  if(isSignedin){
    return <div><Dashboard/></div>
  }else{
    return <div>User not Signed In</div>
  }
  
}

export default page