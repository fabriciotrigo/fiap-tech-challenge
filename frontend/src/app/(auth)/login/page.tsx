"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from 'react-toastify';
import { useAuth } from "../../../contexts/AuthContext"
import { API_URL } from "../../../lib/api";

export default function LoginPage() {
  
  const router = useRouter()
  const { login } = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(e: any) {

    e.preventDefault()
    
    const response = await fetch(`${API_URL}/users/signin`, {
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
    <div className="flex flex-col items-center justify-center min-h-screen">
    
      <form
        onSubmit={handleLogin}
        className="bg-gray-100 p-8 rounded-lg shadow-md w-96"
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <Image src="/logo_blog.png"
            alt="Logo"
            width={300}
            height={300} 
          />
        </div>

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input" 
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input" 
        />

        <button
          type="submit"
          className="btn btn-blue w-full p-2"
          disabled={(username == '' || password == '')}
        >
          Entrar
        </button>

        <p className="text-sm text-center mt-4">
          Não tem conta?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Cadastre-se
          </span>
        </p>

      </form>
    </div>
  )
}