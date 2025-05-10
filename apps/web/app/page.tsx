'use client'
import React from 'react';
import NavBar from '@/components/NavBar/NavBar';
import HomePage from '@/components/HomePage/HomePage';

function App() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.7),rgba(17,24,39,0.9))] pointer-events-none"></div>
        <div className="relative z-10">
          <NavBar />
          <HomePage/>
        </div>
      </div>
  );
}

export default App;
