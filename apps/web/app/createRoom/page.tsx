'use client'
import axios from 'axios'
import { ArrowRight, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const page = () => {

    const BACKEND_URL = "http://localhost:4000/createRoom"

    interface FormValues {
        slug: string
    }

    const router = useRouter()
    const{
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting}
    } = useForm<FormValues>()

    const onsubmit:SubmitHandler<FormValues> = async (formData) => {
        try{
            const token = localStorage.getItem("token")
            const response = await axios.post(BACKEND_URL, formData, {
                headers:{
                    Authorization: `${token}`
                }
            })
            if(response.data.success){
                console.log("Room Created Successfully")
            }
            reset()
            router.push("/joinRoom")
        }
        catch(error){
            console.log("Error while Creating Room")
        }
    }

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
            {/* Login Card */}
            <div className='p-5 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm backdrop-filter border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl'>
                <form onSubmit={handleSubmit(onsubmit)}>
                    {/* SLug Input */}
                    <div className="mb-5">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-400" />
                            </div>
                            
                            <input
                            {...register('slug',{ required: 'Slug is required' })}
                            type="slug"
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:placeholder-gray-500 transition-all duration-200"
                            placeholder="Enter your slug..."
                            />
                            {errors.slug && <p className='text-red-500 text-sm'>{errors.slug.message}</p>}
                        </div>
                    </div>
                    {/* Login Button */}
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full mt-8 cursor-pointer flex justify-center items-center 
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
                </form>
            </div>
        </div>
    </div>
  )
}

export default page