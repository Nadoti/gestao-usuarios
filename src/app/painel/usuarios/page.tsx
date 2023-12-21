
import { TableUsers } from "@/components/dashboard/users/TableUsers"
import { axiosInstance } from "@/utils/axios"


async function getUsers() {
  const { data } = await axiosInstance.get("/users")
  return data.users
}

export default async function Users() {
  const registeredUsers= await getUsers()
  
  return (
    <main className="w-full">
      {
        registeredUsers.length > 0 ? (
          <TableUsers registeredUsers={registeredUsers}/>
        ) : (
          <div className="w-full max-w-5xl flex flex-col items-center justify-center mx-auto gap-10">
            <h1 className="text-3xl font-normal text-gray-700">Nenhum Usuario Cadastrado</h1>
            <a href="/painel/cadastro" className='inline-block py-1 px-6 text-white rounded-lg transition-all bg-gray-600 border-2 hover:bg-transparent hover:text-gray-600 hover:border-gray-600'>Cadastre um usuario</a>
          </div>
        )
      }
    </main>
  )
}