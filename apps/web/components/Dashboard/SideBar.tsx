'use client'
import React, { useEffect, useState } from 'react';
import { MessageCircle, Users, Settings, LogOut, Search, Plus, Star, Archive, MessageSquare, MessageSquareMore } from 'lucide-react';
import { Room, RoomCategory, Participant } from './types';
import { AxiosRequestHeaders } from 'axios';
import { userEndpoints } from '@/services/apis';
import { apiConnector } from '@/services/axios';
import FormModal from '@/components/Common/FormModal';
import ConfirmationModal from '@/components/Common/ConfirmationModal';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from "../../assets/logo_1.png"
import chat_logo from "../../assets/chat_logo.png"
import Link from 'next/link';

function SideBar() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([])
  const [searchTerm, setSearchTerm] = useState('');
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false)
  const [isCreateRoomModal, setCreateRoomModal] = useState(false)
  const [isJoinRoomModal, setJoinRoomModal] = useState(false)
  const [activeCategory, setActiveCategory] = useState<RoomCategory>('all');

  
  
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    USER_ROOM_DETAILS_API
  } = userEndpoints
  

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const getUserRooms = async () => {
        const response = await apiConnector("GET", USER_ROOM_DETAILS_API, undefined, {
            Authorization: `${token}`
        } as AxiosRequestHeaders
    )
    setRooms(response.userRooms)
    }
    getUserRooms()
  }, [])


  // Avatar Component
  const Avatar = ({ src, alt, isOnline, size = 'md' }: { src: string; alt: string; isOnline?: boolean; size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12'
    };

    return (
      <div className="relative">
        <img 
          src={src} 
          alt={alt} 
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gray-800`} 
        />
        {isOnline !== undefined && (
          <div 
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
              isOnline ? 'bg-green-500' : 'bg-gray-500'
            }`}
          />
        )}
      </div>
    );
  };

  // AvatarGroup Component
  const AvatarGroup = ({ participants, maxDisplay = 3 }: { participants: Participant[]; maxDisplay?: number }) => {
    const displayParticipants = participants.slice(0, maxDisplay);
    const remainingCount = participants.length - maxDisplay;

    return (
      <div className="flex -space-x-2">
        {displayParticipants.map((participant) => (
          <div key={participant.id} className="relative">
            <Avatar 
              src={participant.avatar} 
              alt={participant.name}
              isOnline={participant.isOnline}
              size="sm"
            />
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-xs text-white border-2 border-gray-900">
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  // Badge Component
  const Badge = ({ count }: { count: number }) => {
    if (count <= 0) return null;
    
    return (
      <div className="bg-purple-500 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-5 flex items-center justify-center">
        {count > 99 ? '99+' : count}
      </div>
    );
  };

  return (
    <>
        <div className="w-full md:w-80 lg:w-fit border-r border-gray-800 flex h-screen bg-gray-950 text-white">
        {/* Left sidebar with navigation */}
        <div className="w-16 h-full">
            <div className="flex flex-col items-center justify-between h-full py-6 bg-gray-900 border-r border-gray-800">
            <div className="flex flex-col items-center">
                <Link href="/rooms">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold mb-8">
                <Image alt='logo' src={chat_logo} className="max-w-full h-auto"/>
                </div>
                </Link>
                
                <div className="flex flex-col space-y-6">
                <button className="cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center bg-gray-800 text-purple-500 transition-all duration-200 hover:bg-gray-700">
                    <MessageCircle size={20} />
                </button>
                <button 
                  onClick={()=>setCreateRoomModal(true)}
                  className="cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-gray-800 hover:text-white">
                    <Plus size={20} />
                </button>
                <button className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-gray-800 hover:text-white">
                    <Settings size={20} />
                </button>
                </div>
            </div>
            
            <div className="flex flex-col items-center space-y-6">
                <button 
                onClick={()=>setLogoutModalOpen(true)}
                className="cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-gray-800 hover:text-red-500">
                    <LogOut size={20} />
                </button>
                
                <div className="cursor-pointer">
                <Avatar 
                    src="https://i.pravatar.cc/150?img=33" 
                    alt="User Profile"
                    isOnline={true}
                    size="md"
                />
                </div>
            </div>
            </div>
        </div>
        
        {/* Room list */}
        <div className="w-full md:w-80 lg:w-96 border-r border-gray-800 bg-gray-900">
            <div className="p-3 mt-4 w-32">
                <Image alt='logo' src={logo} className="max-w-full h-6"/>
            </div>
            <div className='border border-gray-800'></div>

            <div className="h-[calc(100%-73px)] flex flex-col">
            <div className="px-4 pt-4 pb-2">
                <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search rooms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 text-white rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                </div>

                <div className="flex space-x-2 mb-4">
                <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-3 py-1 rounded-full text-sm ${
                    activeCategory === 'all'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                    Active
                </button>
                <button
                    onClick={() => setActiveCategory('favorites')}
                    className={`px-3 py-1 rounded-full text-sm ${
                    activeCategory === 'favorites'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                    Favorites
                </button>
                <button
                    onClick={() => setActiveCategory('archived')}
                    className={`px-3 py-1 rounded-full text-sm ${
                    activeCategory === 'archived'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                    Archived
                </button>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto px-4 pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                {
                    rooms.length > 0 ? (
                        rooms.map((room) => (
                            <Link key={room.id} href={`/rooms/chat/${room.id}`}>
                                <div 
                                key={room.id}
                                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 mb-2
                                    ${room.id === selectedRoomId 
                                    ? 'bg-gray-800 border-l-4 border-purple-500' 
                                    : 'bg-gray-900 hover:bg-gray-800'}`}
                                onClick={() => setSelectedRoomId(room.id)}
                                >
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-medium text-white truncate max-w-[180px]">
                                        {room.slug}
                                        </h3>
                                        
                                    </div>
                                    <span className="text-xs text-gray-400">Last Message</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-400 truncate max-w-[220px]">
                                        "Hi there"
                                    </p>
                                    <Badge count={5} />
                                    </div>
                                    
                                    <div className="flex justify-between items-center mt-2">
                                    {/* <AvatarGroup participants={} /> */}
                                    <div className="flex items-center text-xs text-gray-500">
                                        <MessageSquare size={12} className="mr-1" />
                                        5
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </Link>
                        ))
                    ) : <div>
                        <p>No room Found</p>
                    </div>
                }     
            </div>
            
            <div className="p-4 border-t border-gray-800">
              <button 
              onClick={()=>setJoinRoomModal(true)}
              className="cursor-pointer w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 px-4 flex items-center justify-center transition-colors duration-200">
              <MessageSquareMore size={18} className="mr-2" />
              Join Room
              </button> 
            </div>
            </div>
        </div>
        </div>

        <FormModal
          isOpen={isJoinRoomModal}
          onClose={() => setJoinRoomModal(false)}
          title="Join Room"
          placeholder='Enter your slug'
          use='joinRoom'
          confirmText = 'Join Room'
          cancelText = 'Cancel'
        />

        <FormModal
          isOpen={isCreateRoomModal}
          onClose={() => setCreateRoomModal(false)}
          title="Create Room"
          placeholder='Enter your slug'
          use='createRoom'
          confirmText = 'Create Room'
          cancelText = 'Cancel'
        />
        {/* LOGOUT */}
        <ConfirmationModal
          isOpen={isLogoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={() => {
            localStorage.removeItem('token')
            dispatch(clearUser())
            router.push("/")
          }}
          title="Logout"
          message= "Do you really want to logout?"
          confirmText = 'Logout'
          cancelText = 'Cancel'
        />
    </>
  );
}

export default SideBar;

