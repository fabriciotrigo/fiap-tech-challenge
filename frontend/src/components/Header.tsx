"use client"

import { useRouter } from "next/navigation"
//import { useState } from "react"
//import { getUser } from "../utils/auth"
import { useAuth } from "@/contexts/AuthContext"

export function Header() {

  const router = useRouter()
  //const user = getUser()
  const { user, logout } = useAuth()
  /*const [search, setSearch] = useState("")

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSearch(value)
    onSearch?.(value) // opcional
  }*/

  /*function handleLogout() {
    localStorage.removeItem("token")
    router.push("/login")
  }*/

  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between items-center">

      {/* Logo / Nome */}
      <h1
        onClick={() => router.push("/postagem")}
        className="text-xl font-bold cursor-pointer"
      >
        Blog Educacional
      </h1>

      {/* Busca
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleSearch}
        className="border p-2 rounded w-64"
      />
       */}
    
      {/* Ações */}
      <div className="flex items-center gap-3">

        {/* só professor */}
        {user?.nivel === 1 && (
            <button
                type="button"
                onClick={() => router.push("/postagem/criar")}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 hover:cursor-pointer"
            >
                + Criar Postagem
            </button>
        )}

        <button
            type="button"
            onClick={logout}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 hover:cursor-pointer"
        >
            Sair
        </button>

      </div>

    </header>
  )
}