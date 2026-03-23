"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

type User = {
    username: string
    nivel: number
}

type AuthContextType = {
    user: User | null
    loading: boolean
    login: (token: string) => void
    logout: () => void
    getToken: () => string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // carregar usuário ao iniciar
    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            try {
                const decoded = jwtDecode<User>(token)
                setUser(decoded)
            } catch {
                localStorage.removeItem("token")
            }
        }

        setLoading(false)
    }, [])

    function getToken() {
        return localStorage.getItem("token")
    }

    function login(token: string) {
        localStorage.setItem("token", token)

        const decoded = jwtDecode<User>(token)
        setUser(decoded)
    }

    function logout() {
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider")
    }

    return context
}