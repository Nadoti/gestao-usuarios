"use client"
import { useState } from 'react';
import { Paginate } from "@/components/dashboard/users/Pagination"
import { TableUsersType } from '@/types/table-users-type';
import Link from 'next/link';
import { axiosInstance } from '@/utils/axios';
import { notification } from '@/utils/notification';
import { DeleteUser } from '@/api/delete-user';
import { FormDataWithFile } from '@/types/formData-type';
import { createFormDataWithFile } from '@/utils/form-data';

export function TableUsers({ registeredUsers }: { registeredUsers: TableUsersType[]}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = registeredUsers.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  async function deleteUser(email: string) {
    const formData = createFormDataWithFile();
    formData.append("email", email);

    await DeleteUser(formData)
  }

  return (
    <section className="w-full ">
      <div className="w-full max-w-3xl h-[70vh] flex flex-col mx-auto">
        <table className="w-full mb-8">
          <thead>
            <tr className="text-left">
              <th>Nome</th>
              <th>Email</th>
              <th>Data de Nascimento</th>
            </tr>
          </thead>
          <tbody className="">
            {currentPosts.map((user) => (
              <tr key={user.email} >
                <td className="pt-2">{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.dateBirth).toLocaleDateString()}</td>
                <td>
                  <Link href={`/painel/detalhes?email=${user.email}`} className="bg-green-300 pt-1 px-6 rounded-lg text-sm">Detalhes</Link>
                </td>
                <td>
                  <button onClick={() => deleteUser(user.email)} className="bg-red-300 pt-1 px-6 rounded-lg text-sm">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginate
          postsPerPage={postsPerPage}
          totalPosts={registeredUsers.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </section>
  )
}