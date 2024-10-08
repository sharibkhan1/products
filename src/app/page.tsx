'use client';
import appde from "@/public/app-ui.png"
import logo from "@/public/logo.png"

import { redirect, useRouter } from 'next/navigation'; // Import navigation functions
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  const router = useRouter(); // Initialize router for navigation
  const handleRedirect = () => {
    router.push('/signin'); // Redirects the user to the sign-in page
  };
  return (
<div className='h-screen flex w-full justify-center' >
<div className='w-[600px] ld:w-full flex flex-col items-center p-6 ' >
            <Image
            src={logo}
            alt="LOGO"
            sizes="100vw"
            style={{
                width:"20%",
                height:"auto",
            }}
            width={0}
            height={0}
            />
           <Button variant="secondary" onClick={handleRedirect} >
            Welcome
           </Button>
        </div>
        <div className='hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden
        relative bg-cream flex-col pt-10 pl-24 gap-3 ' >
            <h2 className='text-gravel md:text-4xl font-bold' >
                Hi, Test Auth, SEKIRO !!
            </h2>
            <p className="text-iridium md:text-sm mb-10">
          Corinna is capable of capturing lead information without a form...{' '}
          <br />
          something never done before 😉
        </p>
        <Image
            src={appde}
            alt="iamge"
            loading='lazy'
            sizes="30"
            className='absolute shrink-0 !w-[1600px] top-48 '
            width={0}
            height={0}
        />  
        </div>
    </div>

  );
}
