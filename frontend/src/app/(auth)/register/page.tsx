"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function RegisterPage() {

  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [nivel, setNivel] = useState("2") 

  async function handleRegister(e: any) {
    e.preventDefault()

    try {

        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password: password,
                nivel: Number(nivel)
            })
        })

        if (response.ok) {
            toast.success("Usuário cadastrado com sucesso!", {
                position: "top-center",
                closeOnClick: true
            })

            router.push("/login")

        } else {
            toast.error("Erro ao cadastrar usuário", {
                position: "top-center",
                closeOnClick: true
            })
        }

    } catch {
        toast.error("Erro de conexão", {
            position: "top-center",
            closeOnClick: true
        })
    }
  }

  return (

    <div className="flex items-center justify-center min-h-screen">
        <form
            onSubmit={handleRegister}
            className="bg-gray-100 p-8 rounded-lg shadow-md w-96"
        >
            <h1 className="text-2xl font-bold mb-6 text-center">
                Cadastro
            </h1>

            {/* Usuário */}
            <input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input mb-4"
            />

            {/* Senha */}
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input mb-4"
            />

            {/* Nível */}
            <select
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
                className="input mb-6"
            >
                <option value="1">Professor</option>
                <option value="2">Aluno</option>
            </select>

            <button
                type="submit"
                className="btn btn-green w-full p-2"
                disabled={!username || !password}
            >
                Cadastrar
            </button>

            {/* Voltar */}
            <p className="text-sm text-center mt-4">
                Já tem conta?{" "}
                <span
                    onClick={() => router.push("/login")}
                    className="text-blue-600 cursor-pointer"
                >
                    Fazer login
                </span>
            </p>
        </form>
    </div>
  )
}