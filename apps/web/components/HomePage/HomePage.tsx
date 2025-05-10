import React from 'react'

import { MessageSquare, Zap, Shield, Users } from 'lucide-react';
import Link from 'next/link';


const HomePage = () => {

    const cardData = [
        {
            id: 1,
            title: "Smart Conversations",
            description: "AI-powered chat features for more meaningful interactions",
            logo: MessageSquare
        },
        {
            id: 2,
            title: "Lightning Fast",
            description: "Real-time messaging with instant delivery<",
            logo: Zap
        },
        {
            id: 3,
            title: "Secure & Private",
            description: "End-to-end encryption for all your conversations",
            logo: Shield
        },
        {
            id: 4,
            title: "Team Collaboration",
            description: "Perfect for teams of any size",
            logo: Users
        },
    ]

  return (
    <>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="py-20 text-center">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 inline-block text-transparent bg-clip-text">
                Welcome to VOXA
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Experience the future of communication with our AI-powered chat platform.
                Connect, collaborate, and create meaningful conversations.
            </p>
            <div className="flex gap-4 justify-center">
                <Link href="/signin">
                <button 
                    
                    className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                        Get Started
                </button>
                </Link>
                <button className=" cursor-pointer bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors border border-gray-700 hover:border-gray-600">
                Learn More
                </button>
            </div>
            </div>
            
            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
                {
                    cardData.map((card, id)=>(
                        <div key={id} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
                            <card.logo className='w-12 h-12 text-blue-500 mb-4'/>
                            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                            <p className="text-gray-400">{card.description}</p>
                        </div>
                    ))
                }
            </div>
        </main>
    </>
  )
}

export default HomePage