



export  async function LoginHandler(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            
        }
    )

    const data = await response.json();
    if (response.ok) {
        // Simpan token di cookies
        document.cookie = `token=${data.data.token}; Path=/; `;
        document.cookie = `userRole=${data.data.user.role}; Path=/;`;
        document.cookie = `userId=${data.data.user.id}; Path=/;`;
       
       return true
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
   
  return 
}
