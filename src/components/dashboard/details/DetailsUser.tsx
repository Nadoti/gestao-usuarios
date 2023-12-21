"use client"
import axios from "axios"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ModalChangeAvatar } from "./ModalChangeAvatar"
import { User } from "@/types/user-type"
import { avatarAws } from "@/api/avatar-aws"
import { LoadingSpinner } from "@/components/LoadingSpinner"

type IParams = {
  email: string
  name: string
  dateBirth: string
}

export function DetailsUser({ email, user }: { email: string, user: User}) {
  const [img, setImg] = useState("")
  const [isModalAvatarOpen, setIsModalAvatarOpen] = useState("close")

  useEffect(() => {
    async function getImageFromS3() {
      const response = await avatarAws(email)
      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);
      setImg(url);
    }

    getImageFromS3()
  }, [])

  return (
    <section className="w-full">
      <div className="w-full max-w-5xl grid grid-cols-2 mx-auto gap-4">
        <div className="">
          <Image 
            src={img} 
            alt="avatar" 
            className="w-80 h-80 rounded-full object-cover" width={30} height={30}

          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xl font-bold text-gray-600">Nome: <span className="text-base font-normal text-gray-400">{user.name}</span></p>
          <p className="text-xl font-bold text-gray-600">Email: <span className="text-base font-normal text-gray-400">{user.email}</span></p>
          <p className="text-xl font-bold text-gray-600">Data de Nascimento: <span className="text-base font-normal text-gray-400">{new Date(user.dateBirth).toLocaleDateString()}</span></p>

          <div className="mt-5">
            <button 
              onClick={() => setIsModalAvatarOpen("open")}
              className="inline-block py-2 px-6 bg-gray-600 text-base text-white rounded-lg border-2 transition-all hover:bg-transparent hover:text-gray-600 hover:border-gray-600">trocar avatar</button>
          </div>
        </div>
      </div>
      {isModalAvatarOpen === "open" && <ModalChangeAvatar email={email} setIsModalAvatarOpen={setIsModalAvatarOpen}/>}
    </section>
  )
}