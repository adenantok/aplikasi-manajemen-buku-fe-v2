"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export async function GetBooks(page: number, limit: number) {
  const data = await fetchWithAuth(`http://localhost:8080/books?page=${page}&limit=${limit}`);
  return data.data;
}

export async function AddBook(data: FormData) {
  const user_id = parseInt(data.get("user_id") as string, 10);// Assuming user_id is part of the form
  const title = data.get("title") as string;
  const author = data.get("author") as string;
  const description = data.get("description") as string;
  console.log(user_id)
  const bookData = {
    user_id,
    title,
    author,
    description,
  };

  try {
    const response = await fetchWithAuth("http://localhost:8080/books", {
      method: "POST",
      body: JSON.stringify(bookData),
    });
    return response;
  } catch (error) {
    console.error("Error adding book:", error);
    return false;
  }
}

export async function DeleteBook(id: number) {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
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
      return true;
    } else {
      console.error("Failed to delete book");
      return false;
    }
  } catch (error) {
    console.error(error);
  }
  return true;
}

export async function EditBook(data: FormData) {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
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
  const id = params.id;
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  const response = await fetch("http://localhost:8080/books/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  //console.log(data.data);

  return data.data;
}
