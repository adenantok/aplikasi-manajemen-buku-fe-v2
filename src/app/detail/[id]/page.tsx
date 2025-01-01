import React from 'react'
import { Book } from './book'

export default async function Page({params }:any) {
    const id = await params
    const book = await Book(id)
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-4">
      <div className="space-y-4 px-4 py-6 bg-white rounded-md border shadow-md">
        {book ? (
          <>
            <div>
              <p className="font-bold">Judul:</p>
              <p>{book.title}</p>
            </div>
            <div>
              <p className="font-bold">Penulis:</p>
              <p>{book.author}</p>
            </div>
            <div>
              <p className="font-bold">Deskripsi:</p>
              <p>{book.description}</p>
            </div>
          </>
        ) : (
          <p>Loading book details...</p>
        )}
      </div>
    </div>
  )
}
