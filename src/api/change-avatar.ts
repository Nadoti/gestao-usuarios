import { axiosInstance } from "@/utils/axios"
import { notification } from "@/utils/notification"
import { FormDataWithFile } from "@/types/formData-type" 

export async function ChangeAvatar(formData: FormDataWithFile) {
  
  const responseRegister = await axiosInstance.post("/users/avatar",
      formData
    )

    if(responseRegister.status === 200) {
      notification({
        title: "Sucesso",
        message: "Avatar Cadastrado com Sucesso!",
        type: "success",
      })
      setTimeout(function() {
        window.location.reload()
      }, 3000);
      return true
    }
}