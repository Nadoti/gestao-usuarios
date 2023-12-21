"use client"
import Link from "next/link"
import Image from 'next/image';
import relationshipImg from "../../public/images/relationship.jpg"
import painelImg from "../../public/images/panel.jpg"
import userDetails from "../../public/images/user-details.jpg"
import registerUser from "../../public/images/register-user.jpg"
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  
  return (
    <main>
      <header className="w-full px-2">
        <nav className="w-full max-w-7xl flex items-center justify-between mx-auto py-4 border-gray-200">
          <p className="lg:text-3xl text-green-600">Adms <span className="text-gray-600">User</span></p>
          <Link className="text-xs sm:text-base bg-green-600 border-2 text-white py-2 px-6 rounded-lg transition-all hover:bg-transparent hover:text-green-600 hover:border-green-600" href="/painel/usuarios">Ir para Painel</Link>
        </nav>
      </header>

      <section className="w-full">
        <div className="w-full lg:grid lg:grid-cols-1/2 lg:h-[50rem] mx-auto ">
          <div className="flex flex-col items-center justify-center px-10">
            <h1 className="text-xl sm:text-3xl lg:text-5xl text-gray-800 mb-3 sm:mb-5 text-center">Painel Adminstrativo com alta performance.</h1>
            <p className="text-sm sm:text-base lg:text-xl text-gray-400 text-center">Utilize nosso painel admistrativo que possui alta performance para cadastro de usuarios, e personalize o avatar do seu jeito.</p>
            <span className="flex w-full max-w-xs mx-auto border border-green-600 mt-5" />
            <div className="flex items-center justify-center mt-10 sm:mt-20">
              <Link className="text-xs sm:text-base bg-green-600 border-2 text-white py-2 px-6 lg:mt-10 rounded-lg transition-all hover:bg-transparent hover:text-green-600 hover:border-green-600" href="/painel/usuarios">Venha Conhecer!</Link>
            </div>
          </div>

          <div className="hidden relative w-full h-full max-w-full mb-5 lg:flex items-center justify-center mx-auto ">
            <Image 
              src={relationshipImg}
              alt="relationship" 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full mx-auto flex items-center justify-center rounded-tl-lg rounded-bl-lg"
              loading="lazy"
              priority={false}
              placeholder="empty"
              fill
            />
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl flex flex-col gap-5 sm:grid grid-cols-2  mx-auto items-start justify-between mt-20 sm:mt-36 px-2">
        <div className="w-full pr-2">
          <h2 className="text-base sm:text-xl text-gray-700 mb-1 sm:mb-3">Painel</h2>
          <p className="text-xs sm:text-sm text-gray-500">Painel que lista todos os usuarios, na qual você pode ver os detalhes de cada usuarios e também excluir de acordo.</p>
        </div>
        <div className="relative w-full h-full mb-5 flex items-start justify-center mx-auto">
          <Image 
            src={painelImg}
            alt="relationship" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full mx-auto flex items-center justify-center rounded-tl-lg rounded-bl-lg"
            loading="lazy"
            priority={false}
            placeholder="empty"
          />
        </div>
      </section>

      <section className="w-full max-w-7xl flex flex-col-reverse gap-5 sm:grid sm:grid-cols-2  mx-auto items-start justify-between mt-20 sm:mt-36 px-2">
        <div className="relative w-full h-full mb-5 flex items-start justify-center mx-auto">
          <Image 
            src={userDetails}
            alt="relationship" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full mx-auto flex items-center justify-center rounded-tl-lg rounded-bl-lg"
            loading="lazy"
            priority={false}
            placeholder="empty"
          />
        </div>
        <div className="w-full pr-2 sm:pr-0 sm:pl-2">
          <h2 className="text-base sm:text-xl text-gray-700 mb-1 sm:mb-3">Detalhes do Usuário</h2>
          <p className="text-xs sm:text-sm sm:text-right text-gray-500">Verifique cada detalhe do usuario cadastrado junto com a imagem de foto dele.</p>
        </div>
      </section>

      <section className="w-full max-w-7xl flex flex-col gap-5 sm:grid grid-cols-2  mx-auto items-start justify-between mt-20 sm:mt-36 px-2">
        <div className="w-full pr-2">
          <h2 className="text-base sm:text-xl text-gray-700 mb-1 sm:mb-3">Cadastro</h2>
          <p className="text-xs sm:text-sm text-gray-500">Cadastre usuarios com formulario bem pratico, moldando a foto de acordo com o seu requisições.</p>
        </div>
        <div className="relative w-full h-full mb-5 flex items-start justify-center mx-auto">
          <Image 
            src={registerUser}
            alt="relationship" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full mx-auto flex items-center justify-center rounded-tl-lg rounded-bl-lg"
            loading="lazy"
            priority={false}
            placeholder="empty"
          />
        </div>
      </section>

      <footer className="w-full text-center bg-gray-200 mt-20 sm:mt-36 py-5 sm:py-10 ">
        Todos os Direitos Reservados!
      </footer>
    </main>
  );

}
