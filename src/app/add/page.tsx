"use client"
import AddBookPage from '@/components/AddBook'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function page() {
  return (
    <SessionProvider>
      <AddBookPage />
    </SessionProvider>
  )
}
