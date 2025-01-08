"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import BooksPage from '@/components/BookList'


export default function page() {
  return (
    <>
    <SessionProvider>
      <BooksPage />
    </SessionProvider>
    </>
  )
}
