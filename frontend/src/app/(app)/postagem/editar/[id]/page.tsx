"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useAuth } from "../../../../../contexts/AuthContext"

export default function EditPostPage() {

  const { getToken } = useAuth()
  const { id } = useParams()
  const router = useRouter()

  const [disciplina, setDisciplina] = useState("")
  const [texto_postagem, setTexto] = useState("")
  const [autor, setAutor] = useState("")

  // carregar dados da postagem
  useEffect(() => {

    const token = getToken() // localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    fetch(`http://localhost:3000/postagem/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setDisciplina(data.disciplina)
        setTexto(data.texto_postagem)
        setAutor(data.autor)
      })
      .catch(() => {
        toast.error("Erro ao carregar postagem", {
            position: "top-center",
            closeOnClick: true
        })
      })

  }, [id])

  // alterar e salvar edição
  async function handleSubmit(e: any) {
    e.preventDefault()

    const token = getToken() // localStorage.getItem("token")

    if (!token) return

    try {
        const response = await fetch(`http://localhost:3000/postagem/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                texto_postagem,
                disciplina,
                autor,
            })
      })

        if (response.ok) {
            toast.success("Post atualizado com sucesso!", {
                position: "top-center",
                closeOnClick: true
            }
            )
            router.push("/postagem")
        } else {
            toast.error("Erro ao atualizar", {
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

    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Editar Postagem
      </h1>

      <form onSubmit={handleSubmit}>

        <input
            type="text"
            placeholder="Disciplina"
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
            className="w-full border p-2 mb-4 rounded"
        />

        <textarea
            placeholder="Conteúdo da postagem"
            value={texto_postagem}
            onChange={(e) => setTexto(e.target.value)}
            className="w-full border p-2 mb-4 rounded"
        />

        <p className="text-sm text-gray-500 mt-2">
            Autor: {autor}
        </p>

        <div className="flex gap-2 mt-2">
            <button
                type="submit"
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 hover:cursor-pointer"
            >
                Salvar
            </button>
            <button
                type="button"
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 hover:cursor-pointer"
                onClick={() => router.back()}
            >
                Cancelar
            </button>
        </div>

      </form>

    </div>
  )
}