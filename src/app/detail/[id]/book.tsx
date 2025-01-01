
import { cookies } from "next/headers";


export async function Book(params: {id : number}) {
    const id =  params.id
    const token = (await cookies()).get('token')?.value
    const response =await fetch('http://localhost:8080/books/'+id , {
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
