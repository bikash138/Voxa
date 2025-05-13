import React, { useState } from 'react';
import { X, Send, ArrowRight } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createRoom, joinRoom } from './dashboardAPI';

interface FormModalProps {
  isOpen: boolean,
  onClose: () => void,
  title: string,
  placeholder: string,
  use: string,
  confirmText: string,
  cancelText: string
}

const FormModal: React.FC<FormModalProps> = ({
    isOpen,
    onClose,
    title,
    placeholder,
    use,
    confirmText,
    cancelText
})=>{

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
      if(use === "createRoom"){
        await createRoom(formData, router)
        onClose()
      }else{
        joinRoom(formData, router)
        onClose()
      }
      reset()
    }

    if (!isOpen) return null;
    
    return (

    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-xl w-full max-w-md relative animate-fade-in">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <button
                  onClick={onClose}
                  className="cursor-pointer text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div> 

            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {title}
                </label>
                <input
                  type="text"
                  {...register('slug',{ required: 'This field is required' })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                  placeholder={placeholder}
                />
                {errors.slug && <p className='text-red-500 text-sm'>{errors.slug.message}</p>}
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className=" cursor-pointer px-4 py-2 text-gray-300 hover:text-white transition-colors mr-2"
                >
                  {cancelText}
                </button>
                <button
                disabled={isSubmitting}
                  type="submit"
                  onClick={handleSubmit(onsubmit)}
                  className="gap-x-1 cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                >
                  {confirmText}
                  <ArrowRight size={16} className="font-medium" />
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
}

export default FormModal;