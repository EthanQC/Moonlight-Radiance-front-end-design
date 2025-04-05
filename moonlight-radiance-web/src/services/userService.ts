export async function login(username: string, password: string) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
    const resp = await fetch(`${baseUrl}/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    return resp
  }
  
  export async function register(username: string, password: string) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
    const resp = await fetch(`${baseUrl}/api/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    return resp
  }
  