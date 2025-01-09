"use client"

import { Book } from '@/services/books';
import React, { useEffect, useState } from 'react'


interface Book  {
  id: number;
  title: string;
  author: string;
  description: string;
};

export default  function Page({ params }: { params: Promise<Book> }){
  
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      // Panggil fungsi Book untuk mengambil data
      const fetchedBook = await Book({ id: (await params).id });
      setBook(fetchedBook); // Simpan data yang diterima ke state
    };

    fetchBook();
  }, [params]);
  

  return (
    <div className="p-8 container mx-auto">
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
