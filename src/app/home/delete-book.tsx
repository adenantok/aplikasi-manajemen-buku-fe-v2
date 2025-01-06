"use server"

import { cookies } from "next/headers";
export  async function DeleteBook(id: number) {

    const token = (await cookies()).get("token")?.value;
    try {
        
        const response = await fetch(`http://localhost:8080/books/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });
    
          const data = await response.json();
          console.log(data);
          console.log(data.message);
          console.log(data.status);
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
