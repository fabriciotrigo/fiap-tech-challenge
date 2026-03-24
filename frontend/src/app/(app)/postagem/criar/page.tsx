"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useAuth } from "@/contexts/AuthContext"
import { API_URL } from "../../../../lib/api";

export default function CriarPostagemPage() {

    const { user, loading, getToken } = useAuth()
    const router = useRouter()

    const [disciplina, setDisciplina] = useState("")
    const [texto, setTexto] = useState("")

    // proteger rota
    useEffect(() => {

        if (loading) return

        if (!user) {
            router.push("/login")
            return
        }

        if (user.nivel !== 1) {
            router.push("/postagem")
        }

    }, [loading, user])

    async function handleSubmit(e: any) {
        e.preventDefault()

        const token = getToken()

        if (!token) return

        try {
            const response = await fetch(`${API_URL}/postagem`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    disciplina,
                    texto_postagem: texto,
                    autor: user?.username
                })
            })

            if (response.ok) {
                toast.success("Postagem criada com sucesso!", {
                    position: "top-center",
                    closeOnClick: true
                })

                router.push("/postagem")

            } else {
                toast.error("Erro ao criar postagem", {
                    position: "top-center",
                    closeOnClick: true
                })
            }

        } catch {
            toast.error("Erro de conexão com o servidor")
        }
    }

    return (

        <div className="max-w-2xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">
                Nova Postagem
            </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

            <input
                type="text"
                placeholder="Disciplina"
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
                className="input"
            />

            <textarea
                placeholder="Digite o conteúdo da postagem..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                className="h-100 input"
            />

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="btn btn-green px-2 py-1"
                    disabled={!disciplina || !texto}
                >
                    Criar
                </button>

                <button
                    type="button"
                    onClick={() => router.push("/postagem")}
                    className="btn btn-gray px-2 py-1"
                >
                    Cancelar
                </button>
            </div>
        </form>
    </div>
    )
}