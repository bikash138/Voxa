'use client'
import { ArrowRight, Eye, Lock, Mail, User } from 'lucide-react'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AxiosRequestHeaders } from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { userAtom } from '@/Recoil/userAtom'
import { useSetRecoilState } from 'recoil'
import { toast } from 'sonner'
import { apiConnector } from '@/services/axios'
import { authEndpoints, userEndpoints } from '@/services/apis'

const Auth = ({isSignin} : {isSignin:boolean}) => {
    //API ENDPOINTS
    const {
        SIGNUP_API,
        SIGNIN_API
    } = authEndpoints
    const{
        USER_DETAILS_API
    } = userEndpoints

    //INTERFACE
    interface FormValues{
        email: string,
        password: string,
        name?: string
    }

    const URL = `${isSignin ? SIGNIN_API : SIGNUP_API}`
    const router = useRouter()
    const setUser = useSetRecoilState(userAtom)
    const{
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const onsubmit:SubmitHandler<FormValues> = async (formData) => {
        try{
            const toastId = toast.loading("Loading...")
            const response = await apiConnector("POST", URL, formData)
            if(isSignin){
                const token = response?.token
                localStorage.setItem('token', token)
                const userResponse = await apiConnector("GET", USER_DETAILS_API, undefined, {
                    Authorization: `${token}`
                } as AxiosRequestHeaders)
                const {name, email} = userResponse?.userDetails
                localStorage.setItem('name', name)
                localStorage.setItem('email', email)
                setUser(userResponse?.userDetails) 
                toast.dismiss(toastId)
                router.push("/dashboard")
            }else{
                toast.dismiss(toastId)
                router.push("/signin")
            }
        }catch(error){
            console.log(`${isSignin ? "Signin Error" : "SignUp Error"}`)
        }
    }

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
            {/* Login Form */}
            <div className='p-5 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm backdrop-filter border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl'>
                <form onSubmit={handleSubmit(onsubmit)}>
                {/* Email Input */}
                <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                    </div>
                    
                    <input
                    {...register('email',{ required: 'Email is required' })}
                    type="email"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:placeholder-gray-500 transition-all duration-200"
                    placeholder="name@example.com"
                    />
                    {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                </div>
                </div>

                {/* Password Input */}
                <div className="mb-5">
                <div className="flex justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                    </label>
                    <button type="button" className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none transition-colors duration-200">
                    Forgot password?
                    </button>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                    {...register('password',{ required: 'Password is required' })}
                    type="password"
                    id="password"
                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:placeholder-gray-500 transition-all duration-200"
                    placeholder="••••••••"
                    />
                    {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button type="button" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                        <Eye size={18} className="text-gray-400" />
                    </button>
                    </div>
                </div>
                </div>

                {/* Name Input */}
                {
                isSignin ? "" 
                : <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                        </div>
                        <input
                        {...register('name',{ required: 'Name is required' })}
                        type="text"
                        id="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:placeholder-gray-500 transition-all duration-200"
                        placeholder="name"
                        />
                        {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
                    </div>
                    </div> 
                }
                
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
                     
                        <span className="relative inline-flex items-center group">
                            <span>{isSignin ? "Signin" : "Signup"}</span>
                            <ArrowRight 
                            size={18} 
                            className="ml-2 group-hover:translate-x-1 transition-transform duration-200" 
                            />
                        </span>
                    </button>
                    {
                        isSignin 
                            ? <div className="mt-4 text-center">
                                <Link 
                                href="/signup" 
                                className="text-md font-medium text-blue-400 hover:text-purple-500 focus:outline-none transition-all duration-300"
                                >
                                Create an account
                                </Link>
                            </div> 
                            : <div className="mt-4 text-center">
                                <Link 
                                href="/signin" 
                                className="text-md font-medium text-blue-400 hover:text-purple-500 focus:outline-none transition-all duration-300"
                                >
                                Already have an account?
                                </Link>
                            </div>
                    }
                </form>
            </div>
        </div>
    </div>
  )
}

export default Auth