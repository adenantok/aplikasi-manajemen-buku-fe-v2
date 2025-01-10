import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

// utils/fetchWithAuth.ts
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `${token}`,
    ...options.headers, // Combine any additional headers
  };

  const response = await fetch(url, { ...options, headers });
  console.log(response)
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Invalid token');
    }
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
}
