'use client'
import { ArrowRight, Router, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ConfirmationModal from '../Common/ConfirmationModal'
import { useRouter } from 'next/navigation'
import { userAtom } from '@/Recoil/userAtom'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const Dashboard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const name = localStorage.getItem('name')
  // const user = useRecoilValue(userAtom) 
  // console.log(user) 


  return (
    <>
      <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
          Welcome, <span className="text-purple-500">{name || "Guest"}!</span>
        </h1>
              {/* Login Card */}
              <div className='p-5 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm backdrop-filter border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl'>
                {/* Create Room Button */}
                <Link href="/createRoom">
                  <button
                      className="w-full mt-4 cursor-pointer flex justify-center items-center 
                              py-2.5 px-4 bg-blue-500 hover:bg-blue-600 focus:ring-4 
                              focus:ring-blue-300 dark:focus:ring-blue-700 text-white 
                              font-medium rounded-lg transition-all duration-200 
                              overflow-hidden group"
                  >
                      <span className="relative inline-flex items-center">
                          <span>Create Room</span>
                          <ArrowRight 
                          size={18} 
                          className="ml-2 group-hover:translate-x-1 transition-transform duration-200" 
                          />
                      </span>
                  </button>
                </Link>

                {/*Join Room Button */}
                <Link href="/joinRoom">
                  <button
                        className="w-full mt-4 mb-4 cursor-pointer flex justify-center items-center 
                                py-2.5 px-4 bg-blue-500 hover:bg-blue-600 focus:ring-4 
                                focus:ring-blue-300 dark:focus:ring-blue-700 text-white 
                                font-medium rounded-lg transition-all duration-200 
                                overflow-hidden group"
                    >
                        <span className="relative inline-flex items-center">
                            <span>Join Room</span>
                            <ArrowRight 
                            size={18} 
                            className="ml-2 group-hover:translate-x-1 transition-transform duration-200" 
                            />
                        </span>
                    </button>
                </Link>

                {/* Delete Room */}
                <Link href="/deleteRoom">
                  <button
                        className="w-full mt-4 mb-4 cursor-pointer flex justify-center items-center 
                                py-2.5 px-4 bg-pink-500 hover:bg-pink-700 focus:ring-4 
                                focus:ring-blue-300 dark:focus:ring-blue-800 text-white 
                                font-medium rounded-lg transition-all duration-200 
                                overflow-hidden group"
                    >
                        <span className="relative inline-flex items-center">
                            <span>Delete Room</span>
                            <Trash2 
                            size={18} 
                            className="ml-2 group-hover:translate-x-1 transition-transform duration-200" 
                            />
                        </span>
                    </button>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={()=>setIsModalOpen(true)}
                  className="w-full mt-4 mb-4 cursor-pointer flex justify-center items-center 
                          py-2.5 px-4 bg-blue-500 hover:bg-blue-600 focus:ring-4 
                          focus:ring-blue-300 dark:focus:ring-blue-700 text-white 
                          font-medium rounded-lg transition-all duration-200 
                          overflow-hidden group"
                  >
                    <span className="relative inline-flex items-center">
                        <span>Logout</span>
                        <ArrowRight 
                        size={18} 
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-200" 
                        />
                    </span>
                </button>
              </div>
          </div>
      </div>
      
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          localStorage.removeItem('token')
          localStorage.removeItem('email')
          localStorage.removeItem('name')
          router.push("/")
        }}
        title="Logout"
        message= "Do you really want to logout?"
        confirmText = 'Logout'
        cancelText = 'Cancel'
      />
    </>
  )
}

export default Dashboard