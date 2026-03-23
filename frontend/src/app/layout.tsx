import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../contexts/AuthContext";

export const metadata: Metadata = {
  title: "Blog Educacional",
  description: "Tech Challenge FIAP - Fase 3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
        {children}
        <ToastContainer/>
        </AuthProvider>
      </body>
    </html>
  );
}
