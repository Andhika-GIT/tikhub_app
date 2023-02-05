import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';

import { GoogleOAuthProvider } from '@react-oauth/google';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className="xl:w-[1200px] md:m-auto overflow-hidden h-[100vh]">
        <Navbar />
        <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh] overflow-auto xl:hover:overflow-hidden hidden md:block">
            <Sidebar />
          </div>
          <div className="mt-4 flex flex-col gap-10 overflow-auto md:h-[80vh] h-[75vh] videos flex-1 ">
            <Component {...pageProps} />
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 md:hidden">
          <BottomNav />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
