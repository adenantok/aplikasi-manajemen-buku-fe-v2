"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DeleteBook, GetBooks } from "@/services/books";

type Book = {
  id: number;
  user_id: number;
  title: string;
  author: string;
  description: string;
};

export default function BooksList() {
  const { data: session } = useSession();

  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const limit = 5;

  useEffect(() => {
    const fetchBooks = async () => {
      if (session?.accessToken) {
        // Pastikan token dikirimkan ke GetBooks
        const books = await GetBooks(page, limit, session.accessToken);
        setBooks(books);
        setHasNextPage(books.length === limit); // Sesuaikan dengan respons API yang Anda harapkan
      }
    };
    fetchBooks();
  }, [page, session?.accessToken]);

  const handleDelete = async (id: number) => {
    const success = await DeleteBook(id, session?.accessToken);
    if (success) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    }
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-end mb-4">
        <Link href="/add">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add
          </button>
        </Link>
      </div>
      <table className="table-auto w-full border table-layout-fixed">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border w-[50px]">ID</th>
            <th className="px-4 py-2 border w-[150px]">Title</th>
            <th className="px-4 py-2 border w-[150px]">Author</th>
            <th className="px-4 py-2 border w-[300px]">Description</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr className="border-b" key={book.id}>
              <td className="px-4 py-2 border">{book.id}</td>
              <td className="px-4 py-2 border">{book.title}</td>
              <td className="px-4 py-2 border">{book.author}</td>
              <td className="px-4 py-2 border">{book.description}</td>
              <td className="px-4 py-2 border text-center">
                <div className="flex justify-center">
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
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-300 text-gray-700"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
        >
          Previous
        </button>
        <span className="self-center">Page: {page}</span>
        <button
          onClick={handleNextPage}
          disabled={!hasNextPage}
          className={`px-4 py-2 rounded ${
            !hasNextPage
              ? "bg-gray-300 text-gray-700"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
// function DeleteBook(id: number) {
//     throw new Error("Function not implemented.");
// }

