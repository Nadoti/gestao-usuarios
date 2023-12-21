import { axiosInstance } from "@/utils/axios"
import { notification } from "@/utils/notification"
import { FormDataWithFile } from "@/types/formData-type" 

export async function RegisterUser(formData: FormDataWithFile) {
  
  const responseRegister = await axiosInstance.post("/users",
      formData
    )

    if(responseRegister.data.status === 400) {
      notification({
        title: "Error",
        message: responseRegister.data.error,
        type: "error",
      })
      return false
    }
    if(responseRegister.status === 200) {
      notification({
        title: "Sucesso",
        message: "Cadastro Realizado com Sucesso",
        type: "success",
      })
      return true
    }
}