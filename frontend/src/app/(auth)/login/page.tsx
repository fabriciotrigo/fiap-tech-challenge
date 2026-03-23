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
    <div className="flex flex-col items-center justify-center min-h-screen">
    
      <form
        onSubmit={handleLogin}
        className="bg-gray-100 p-8 rounded-lg shadow-md w-96"
      >
        <div className="flex flex-col items-center justify-center mb-6">
          <Image src="/logo_blog.png"
            alt="Logo"
            width={1000}
            height={1000} 
          />
        </div>

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input" //w-full bg-white border-0 p-2 mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input" //w-full bg-white border-0 p-2 mb-6 rounded"
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