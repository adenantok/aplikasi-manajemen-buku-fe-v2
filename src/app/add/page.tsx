"use client"
import AddBookPage from '@/components/AddBook'
import NavBar from '@/components/NavBar'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function page() {
  return (
    <SessionProvider>
      <NavBar />
      <AddBookPage />
    </SessionProvider>
  )
}
