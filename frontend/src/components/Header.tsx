"use client"

import { useRouter } from "next/navigation"
//import { useState } from "react"
//import { getUser } from "../utils/auth"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"

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
      <Image src="/logo_blog.png"
        alt="Logo"
        width={100}
        height={100} 
        onClick={() => router.push("/postagem")}
        className="cursor-pointer"
      />

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
                className="btn btn-green px-3 py-1"
            >
                + Criar Postagem
            </button>
        )}

        <button
            type="button"
            onClick={logout}
            className="btn btn-gray px-3 py-1"
        >
            Sair
        </button>

      </div>

    </header>
  )
}