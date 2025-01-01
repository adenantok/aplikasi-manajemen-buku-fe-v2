import React from 'react'
import {GetBooks} from './books';
import Link from 'next/link';


export default async function page() {
    const books  = await GetBooks();
    
  return (
    <>
    <div className="container mx-auto p-8">
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
                <Link href={`/detail/${book.id}`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
                  View
                </Link>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  )
}

