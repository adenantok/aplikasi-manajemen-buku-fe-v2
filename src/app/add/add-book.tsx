'use server';
import { cookies } from 'next/headers';

export async function AddBook(data: FormData) {
    const token = (await cookies()).get('token')?.value
    const user_id = parseInt((await cookies()).get('userId')?.value as string, 10)
    const title = data.get('title') as string;
    const author = data.get('author') as string;
    const description = data.get('description') as string;
    console.log(user_id,title, author, description);
    try {
        const response = await fetch('http://localhost:8080/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
            body: JSON.stringify({user_id, title, author, description })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error adding book:', error);
    }

  return true
}
