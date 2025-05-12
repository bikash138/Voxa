import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from "../../assets/logo.png"
import Image from 'next/image'

const NavBar = () => {

  const[token, setToken] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('token')
    setToken(token || null)
  }, [])

  const navlink = [
    {
      title: "Home",
      link: "/home",
    },
    {
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      title: "FAQs",
      link: "/faq",
    },
  ]

  return (
    <div className='w-full mx-auto px-4 sm:px-6 lg:px-8 flex h-16 justify-center text-white bg-transparent'>
      <div className='bg-gray-800 flex items-center justify-between gap-x-0 lg:gap-x-5 md:gap-x-5 px-12 py-6 rounded-full mt-2'>

        {/* LOGO */}
        <div className='w-28'>
          <Link href="/">
            <Image alt='logo' src={logo} className="max-w-full h-auto"/>
          </Link>
        </div>

        {/* Links */}
        {
          navlink.map((links, index) => (
            <div key={index} className="group hidden sm:block">
              <Link href={links.link} className="text-white font-semibold transition-all duration-300">
                <p className=" group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600">
                  {links.title}
                </p>
              </Link>
            </div>
          ))
        }
        <div className='ml-1 hidden sm:block'>
          {
            token 
            ? <Link href="/dashboard">
                <button className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                  Dashboard
                </button>
              </Link> 
            : <Link href="/signin">
                <button className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                  Signin
                </button>
              </Link>
          }
        </div>
        <div className="sm:hidden">
          
        </div>
      </div>
    </div>
  )
}

export default NavBar