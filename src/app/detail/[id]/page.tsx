"use client"


import { SessionProvider } from 'next-auth/react';
import DetailBook from '@/components/DetailBook';

interface Book  {
  id: number;
  title: string;
  author: string;
  description: string;
};

export default  function Page({ params }: { params: Promise<Book> }){
  return (
    <>
      <SessionProvider>
        <DetailBook params={params} />
      </SessionProvider>
    </>
  )
}