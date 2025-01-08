"use server";


export async function GetBooks(page: number, limit: number, accessToken: string | undefined) {
  const token = accessToken
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

export async function AddBook(data: FormData, accessToken: string | undefined, id: number) {
    const token = accessToken
    const user_id = id
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

export  async function DeleteBook(id: number, accessToken: string | undefined) {

    //const token = (await cookies()).get("token")?.value;
    const token = accessToken
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
