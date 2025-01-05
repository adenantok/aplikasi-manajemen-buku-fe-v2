"use server";
import { cookies } from "next/headers";

export async function EditBook(data: FormData) {
    const token = (await cookies()).get("token")?.value;
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
