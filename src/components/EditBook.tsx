"use client";
import { EditBook } from "@/services/books";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

interface Params {
  id: string;
}

export default function EditBookPage({ params }: { params: Promise<Params> }) {
  // Menggunakan React.use() untuk mengurai params
  const paramsData = React.use(params);
  const id = paramsData.id;
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Tambahkan ID ke FormData
    formData.append("id", id);
    if (session?.accessToken) {
      try {
        const success = await EditBook(formData);
        if (success) {
          router.push("/home"); // Arahkan ke halaman home setelah berhasil menambahkan buku
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        if (error instanceof Error && error.message === "Invalid token") {
          router.push("/login"); // Arahkan ke halaman login
        }
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={id} />
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full h-40"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
}
