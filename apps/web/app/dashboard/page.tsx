'use client';
import Dashboard from '@/components/Dashboard/Dashboard';
import React, { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

const page = () => {
  const [isSignedin, setIsSignedIn] = useState<boolean | null>(null);

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
        <RecoilRoot>
          <div>
            <Dashboard />
          </div>
        </RecoilRoot>
      </>
    );
  } else {
    return (
      <div className='bg-gray-900 text-white min-h-screen w-screen flex items-center justify-center'>
        <div>User not signed in</div>
      </div>
    );
  }
};

export default page;