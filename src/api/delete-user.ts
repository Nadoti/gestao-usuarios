import { FormDataWithFile } from "@/types/formData-type";
import { axiosInstance } from "@/utils/axios";
import { notification } from "@/utils/notification";


export async function DeleteUser(formData: FormDataWithFile) {
  const responseRegister = await axiosInstance.post("/delete-user",
  formData)

  if(responseRegister.data.status === 200) {
    notification({
      message: responseRegister.data.response,
      title: "Sucesso",
      type: "success"
    })
    setTimeout(function() {
      window.location.reload()
    }, 3000);
    return true
  }
}