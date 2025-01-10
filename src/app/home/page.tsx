"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import BooksPage from '@/components/BookList'
import NavBar from '@/components/NavBar'


export default function page() {
  return (
    <>
    <SessionProvider>
      <NavBar />
      <BooksPage />
    </SessionProvider>
    </>
  )
}
