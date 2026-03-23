"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
//import { getUser } from "../../../utils/auth"
import { toast } from 'react-toastify';
import { useAuth } from "../../../contexts/AuthContext"

//const user = getUser()

type Postagem = {
  id: number
  disciplina: string
  texto_postagem: string
  autor: string
}

export default function PostagensPage() {

  const { user, loading, getToken } = useAuth()
  const [postagens, setPostagens] = useState<Postagem[]>([])
  const [search, setSearch] = useState("")
  const router = useRouter()
  
  /*useEffect(() => {

    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    fetchPostagens(token)

  }, [])*/

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.push("/login")
      return
    }

    const token = getToken() //localStorage.getItem("token")

    if (token) {
      fetchPostagens(token)
    }

  }, [loading, user])

  async function fetchPostagens(token: string) {

    try {

      const response = await fetch("http://localhost:3000/postagem", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 401) {
        localStorage.removeItem("token")
        router.push("/login")
        return
      }

      const data = await response.json()

      setPostagens(data)

    } catch (error) {
      console.error("Erro ao buscar postagens:", error)
    }

  }

  async function handleDelete(id: number) {

    const token = getToken() // localStorage.getItem("token")

    if (!token) return

    const confirmDelete = confirm("Deseja excluir esta postagem?")

    if (!confirmDelete) return

    const response = await fetch(`http://localhost:3000/postagem/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.status === 204) {
      // remove da lista sem recarregar
      toast.success("Postagem excluída com sucesso!", {
        position: "top-center",
        closeOnClick: true
      })
      setPostagens(prev => prev.filter(postagem => postagem.id !== id))
    } else {
      toast.error("Erro ao excluir", {
          position: "top-center",
          closeOnClick: true
        }
      )
    }
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSearch(value)
  }

  const filteredPostagens = postagens.filter((post) =>
    post.texto_postagem.toLowerCase().includes(search.toLowerCase()) ||
    post.disciplina.toLowerCase().includes(search.toLowerCase()) ||
    post.autor.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="max-w-4xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">
          Postagens
        </h1>

        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input w-72"
        />
      </div>

      {postagens.length === 0 && (
        <p>Nenhuma postagem encontrada</p>
      )}

      <div className="space-y-4">

        {filteredPostagens.map((postagem) => (

          <div
            key={postagem.id}
            className="bg-gray-100 p-6 rounded-lg shadow-md"
          >

            <h2 className="text-xl font-semibold">
              {postagem.disciplina}
            </h2>

            <p className="text-gray-700 mt-2 line-clamp-1">
              {postagem.texto_postagem}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Autor: {postagem.autor}
            </p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => router.push(`/postagem/editar/${postagem.id}`)}
                className="btn btn-blue px-2 py-1"
              >
                {user?.nivel === 1 && ("Editar")}
                {user?.nivel === 2 && ("Visualizar")}
              </button>

              {user?.nivel === 1 && (
                <button
                  onClick={() => handleDelete(postagem.id)}
                  className="btn btn-red px-2 py-1"
                >
                  Excluir
                </button>
              )}
            </div>

          </div>

        ))}

      </div>

    </div>

  )
}