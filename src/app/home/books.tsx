"use server"

import { cookies } from "next/headers";


export  async function GetBooks(page: number, limit: number)  {
    const token = (await cookies()).get('token')?.value
    const response = await fetch(`http://localhost:8080/books?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      const data = await response.json();
      //console.log(data.data);
      //const books = data.data;
    return data.data
}
