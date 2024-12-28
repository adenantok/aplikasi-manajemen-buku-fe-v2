import { cookies } from "next/headers";

type Book = {
    id: number;
    user_id: number;
    title: string;
    author: string;
    description: string;
  }
export  async function GetBooks(): Promise<Book[]>  {
    const token = (await cookies()).get('token')?.value
    const response = await fetch('http://localhost:8080/books', {
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
