'use client'

import { clearUserLogOut } from "@/lib/features/user.slice";
import { AppDispatch } from "@/lib/store"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


interface Props {
    dispatch: AppDispatch;
    router: AppRouterInstance;
}

export function logoutUser({ dispatch, router } : Props) {
    localStorage.clear();
    dispatch(clearUserLogOut());
    router.push('login?error=el acceso ha expirado');
}