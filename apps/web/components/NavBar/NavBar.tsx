import Link from 'next/link'
import React from 'react'

const NavBar = () => {

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
    <div className='w-full flex h-14 justify-between px-4 text-white bg-transparent'>
      <div className='flex items-center justify-center'>
        <h1>Voxa</h1>
      </div>
      <div className='bg-gray-800 flex items-center justify-center gap-x-5 px-12 py-6 rounded-full mt-2'>
        {
          navlink.map((links, index) => (
            <div key={index} className="group">
              <Link href={links.link} className="text-white font-semibold transition-all duration-300">
                <p className=" group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600">
                  {links.title}
                </p>
              </Link>
            </div>
          ))
        }
      </div>
      <div className=' bg-gray-900 flex items-center justify-center rounded-full'>
        <Link href="/signin">
          <button className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
            Signin
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NavBar