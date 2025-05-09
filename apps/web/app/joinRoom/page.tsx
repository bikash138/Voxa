'use client'
import { roomEndpoints } from '@/services/apis'
import { apiConnector } from '@/services/axios'
import { AxiosRequestHeaders } from 'axios'
import { ArrowRight, Mail, MessageSquareMore } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const page = () => {
    //ENDPOINTS
    const {
        JOIN_ROOM
    } = roomEndpoints

    //INTERFACES
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
            const toastId = toast.loading("Loading...")
            const token = localStorage.getItem("token")
            const response = await apiConnector("GET", `${JOIN_ROOM}/${formData.slug}`, undefined,
                {
                    Authorization: `${token}`
                } as AxiosRequestHeaders
            )
            const roomId = response?.room.id
            if(response?.success){
                console.log(`Room ${formData.slug} with roomId ${roomId} Joined Successfully`)
            }
            reset()
            toast.dismiss(toastId)
            router.push(`/chat/${roomId}`)
        }
        catch(error){
            console.log("Error while Joining Room")
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
                            <MessageSquareMore size={18} className="text-gray-400" />
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
                        className="w-full mt-4 cursor-pointer flex justify-center items-center 
                                py-2.5 px-4 bg-blue-500 hover:bg-blue-600 focus:ring-4 
                                focus:ring-blue-700 text-white 
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
                </form>
            </div>
        </div>
    </div>
  )
}

export default page