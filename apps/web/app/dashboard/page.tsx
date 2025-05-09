'use client';
import Dashboard from '@/components/Dashboard/Dashboard';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [isSignedin, setIsSignedIn] = useState<boolean | null>(null);
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      token ? setIsSignedIn(true) : setIsSignedIn(false);
    }
  }, []);

  if (isSignedin === null) {
    return (
      <div className='bg-gray-900 text-white min-h-screen w-screen flex items-center justify-center'>
        <div>Loading...</div>
      </div>
    );
  }

  if (isSignedin) {
    return (
      <>
          <div>
            <Dashboard />
          </div>
      </>
    );
  } else {
    return (
      router.push("/signin")
    );
  }
};

export default page;