import { DetailsUser } from "@/components/dashboard/details/DetailsUser"
import { User } from "@/types/user-type"
import { axiosInstance } from "@/utils/axios"

async function getUser(email: string) {
  const formData = new FormData()
  formData.append("email", email)
  const data = await axiosInstance.post("user", formData)
  return data.data.response
}

export default async function Details({ searchParams }: {searchParams: {email: string}}) {
  const user:User = await getUser(searchParams.email)
  return (
    <DetailsUser email={searchParams.email} user={user}/>
  )
}