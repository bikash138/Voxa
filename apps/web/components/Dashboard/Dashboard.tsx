import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
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

              {/* Logout Button */}
              <Link href="/">
                <button
                  onClick={()=>localStorage.removeItem('token')}
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
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Dashboard