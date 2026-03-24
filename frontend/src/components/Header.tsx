"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"

export function Header() {

  const router = useRouter()
  //const user = getUser()
  const { user, logout } = useAuth()

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