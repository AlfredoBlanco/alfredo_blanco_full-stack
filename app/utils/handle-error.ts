import { AppDispatch } from "@/lib/store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { showNotification } from "./notification";
import { logoutUser } from "./logout-user";


interface RtkError {
    status: number;
    data: {
        error: { status: number; message: string };
    }
}

export default function handleError( error: unknown, dispatch: AppDispatch, router: AppRouterInstance ) {
    const err = error as RtkError;

    showNotification(`Ha ocurrido un error: ${err.data?.error?.message?? ''}`);


    if (err.status === 401) {
        logoutUser({
            dispatch,
            router,
        })
        return;
    } else if(err.status === 404) {
        console.log('vamoa 404');
        return;
    }

    return;
}