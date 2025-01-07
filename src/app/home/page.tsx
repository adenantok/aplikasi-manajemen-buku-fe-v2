"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import BooksPage from './books-page'

export default function page() {
  return (
    <>
    <SessionProvider>
      <BooksPage />
    </SessionProvider>
    </>
  )
}
