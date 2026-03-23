import { Header } from "../../components/Header"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="p-6">{children}</main>
    </>
  )
}