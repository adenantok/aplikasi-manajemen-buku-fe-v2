import { signOut } from 'next-auth/react'
import React from 'react'

export default function NavBar() {
    return (
        <div className="bg-gray-800 p-4">
            <div className="container mx-auto px-8 flex justify-between space-x-4">
                <div className="flex items-center space-x-4">
                    <h1 className="text-white text-lg font-bold">Navbar</h1>
                    <a href="/home" className="text-gray-300 hover:text-white transition">Home</a>
                </div>
                <div className="flex items-center">
                    <button
                     onClick={() => signOut({ callbackUrl: "/login" })} 
                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Logout</button>
                </div>
            </div>
        </div>
    )
}
