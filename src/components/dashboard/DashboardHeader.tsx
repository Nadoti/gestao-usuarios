"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function DashboardHeader() {
  const pathName = usePathname()
  const path = pathName.split("/")[2]
  return (
    <header className="w-full mb-10">
      <div className="w-full max-w-7xl flex items-center justify-between mx-auto border-b-2 py-4 border-gray-200">
        <div className="px-2">
          <h1 className="text-4xl text-gray-500">Painel</h1>
        </div>
        <Link className={`text-lg  py-1 px-2 rounded-md text-gray-500 `} href="/">Voltar para home</Link>
        <nav className="flex items-center gap-10">
          <Link className={`text-lg  py-1 px-2 rounded-md text-gray-500 ${path === "usuarios" && " bg-gray-300"}`} href="/painel/usuarios">Usuarios</Link>
          <Link className={`text-lg  py-1 px-2 rounded-md text-gray-500 ${path === "cadastro" && " bg-gray-300"}`} href="/painel/cadastro">Cadastro</Link>
        </nav>
      </div>
    </header>
  )
}