"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";


export async function GetBooks(page: number, limit: number) {
  //const token = accessToken
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  //console.log(session)
  //console.log(token)
  //const token = (await cookies()).get('token')?.value;
  const response = await fetch(`http://localhost:8080/books?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  //console.log(data);
  return data.data;
}

export async function AddBook(data: FormData) {
    const session = await getServerSession(authOptions)
    const token = session?.accessToken
    const user_id = session?.user.id
    const title = data.get('title') as string;
    const author = data.get('author') as string;
    const description = data.get('description') as string;
    //console.log(user_id,title, author, description);
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
        //console.log(data);
    } catch (error) {
        console.error('Error adding book:', error);
    }

  return true
}

export  async function DeleteBook(id: number) {
    const session = await getServerSession(authOptions)
    const token = session?.accessToken
    try {
        
        const response = await fetch(`http://localhost:8080/books/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });
    
          const data = await response.json();
          //console.log(data);
          //console.log(data.message);
          //console.log(data.status);
          if (response.ok) {
              console.log("Book deleted successfully");
              return true
            } else {
              console.error("Failed to delete book");
              return false
            }
    } catch (error) {
        console.error(error);
    }
    return true
}

export async function EditBook(data: FormData) {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken
    const id = parseInt(data.get("id") as string, 10);
    
    const title = data.get("title") as string;
    const author = data.get("author") as string;
    const description = data.get("description") as string;

    try {
        const response = await fetch("http://localhost:8080/books", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify({ id, title, author, description }),
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error updating book:", error);
    }

    return true;
}

export async function Book(params: { id: number }) {
  const id = params.id
  const session = await getServerSession(authOptions)
  const token = session?.accessToken
  const response = await fetch('http://localhost:8080/books/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  //console.log(data.data);



  return data.data
}