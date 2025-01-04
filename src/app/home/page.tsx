"use client"
import React, { use } from "react";
import { GetBooks } from "./books";
import Link from "next/link";
import { DeleteBook } from "./delete-book";
import { useEffect, useState } from "react";


type Book = {
  id: number;
  user_id: number;
  title: string;
  author: string;
  description: string;
}

export default function page() {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await GetBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

    // Handle delete book and update state
    const handleDelete = async (id: number) => {
      const success = await DeleteBook(id);
      if (success) {
        // Update state to remove the deleted book from the list
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      }
    };
  
  return (
    <>
      <div className="container mx-auto p-8">
        <div className="flex justify-end mb-4">
          <Link href="/add">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add
            </button>
          </Link>
        </div>
        <table className="table-auto w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Author</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr className="border-b" key={book.id}>
                <td className="px-4 py-2 border">{book.title}</td>
                <td className="px-4 py-2 border">{book.author}</td>
                <td className="px-4 py-2 border">{book.description}</td>
                <td className="px-4 py-2 border flex justify-center">
                  <Link
                    href={`/detail/${book.id}`}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                  >
                    View
                  </Link>
                  <Link
                    href={`/edit/${book.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                  >
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(book.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
