import { toast, ToastOptions } from 'react-toastify';



export function showNotification(message: string ) {
    const options: ToastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
    };

    toast.error(message, options)
}