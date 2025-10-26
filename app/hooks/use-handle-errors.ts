'use client'

import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import handleError from "../utils/handle-error";


export function useHandleError () {
    const dispatch = useAppDispatch();
    const router = useRouter();
    
    return (error: unknown) => handleError(error, dispatch, router);

}