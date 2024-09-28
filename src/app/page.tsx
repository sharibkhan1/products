'use client';
import ProductForm from '@/components/product-form';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  return (
    <div className="p-8 bg-slate-800 ">
      <div className='text-white'>{session?.data?.user?.email }</div>
      <button className='text-white' onClick={() => signOut()}>Logout</button>
      <ProductForm/>
    </div>
  )
}

Home.requireAuth = true