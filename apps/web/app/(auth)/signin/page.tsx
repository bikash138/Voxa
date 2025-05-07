"use client"
import Auth from '@/components/Auth/Auth'
import React from 'react'
import { RecoilRoot } from 'recoil'

const page = () => {
  return (
    <RecoilRoot>
      <div>
        <Auth isSignin={true}/>
      </div>
    </RecoilRoot>
  )
}

export default page