"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from 'react-toastify';
import { useAuth } from "../../../contexts/AuthContext"

export default function LoginPage() {

  const router = useRouter()
  const { login } = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(e: any) {

    e.preventDefault()

    const response = await fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    const data = await response.json()

    if (data.token) {
      //localStorage.setItem("token", data.token)
      login(data.token)
      router.push("/postagem")
    } else {
      toast.error("Usuário ou senha inválidos", {
        position: "top-center",
        closeOnClick: true
      })
    }

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400">
    
      <form
        onSubmit={handleLogin}
        className="bg-gray-300 p-8 rounded-lg shadow-md w-96"
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <Image src="/logo_blog.png"
            alt="Logo"
            width={500}
            height={500} 
          />
        </div>

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-white border-0 p-2 mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white border-0 p-2 mb-6 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer"
          disabled={(username == '' || password == '')}
        >
          Entrar
        </button>

      </form>
    </div>
  )
}