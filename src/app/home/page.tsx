"use client";
import React, { useEffect, useState } from "react";

interface Books {
  id: number;
  user_id: number;
  title: string;
  author: string;
  description: string;
}

export default function page() {
  const [books, setBooks] = useState<Books[]>([]);
  
  // Get a cookie by name
  // const getCookie = (name: string): string | undefined => {
  //   const cookieValue = document.cookie.match(
  //     `(^|;)\\s*${name}\\s*=\\s*([^;]+)`
  //   );
  //   return cookieValue ? cookieValue.pop() : undefined;
  // };

  useEffect(() => {
    const fetchBooks = async () => {
      const token = document.cookie.match(/token=([^;]+)/)?.[1];
      //const token = getCookie("token");
      try {
        const response = await fetch("http://localhost:8080/books", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        const data = await response.json();
        setBooks(data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);
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
  );
}
