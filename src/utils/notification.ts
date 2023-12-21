import Swal from 'sweetalert2';

type Notification = {
  title: string
  message: string
  type: "success" | "error"
}

export function notification({title, message, type}: Notification)  {
  Swal.fire({
    title: title,
    text: message,
    icon: type,
    confirmButtonText: 'Continue',
    timer: 3000,
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      `
    },
    hideClass: {
      popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      `
    }  
  })
};