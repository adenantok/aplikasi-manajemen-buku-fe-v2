"use client"


import { useSession } from "next-auth/react";
import { AddBook } from '@/services/books';
import { useRouter } from 'next/navigation';



export default function AddBookPage() {

    const { data: session } = useSession();
    //console.log(session?.user)
    //console.log(session?.user.id)

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (session?.accessToken) {
            const success = await AddBook(formData);
            if (success) {
                router.push("/home");
            }
        }

    }

    return (
        <div className='container mx-auto p-8'>

            <form className='space-y-4' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Title</label>
                    <input type="text" name="title" id="title" className='mt-1 p-2 border border-gray-300 rounded-md w-full' required />
                </div>
                <div>
                    <label htmlFor="author" className='block text-sm font-medium text-gray-700'>Author</label>
                    <input type="text" name="author" id="author" className='mt-1 p-2 border border-gray-300 rounded-md w-full' required />
                </div>
                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                    <textarea name="description" id="description" className='mt-1 p-2 border border-gray-300 rounded-md w-full h-40' required></textarea>
                </div>
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add</button>
            </form>
        </div>
    )
}
