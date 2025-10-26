'use client'
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useAuthenticateMutation } from "@/lib/services/auth-service";
import { useAppDispatch } from "@/lib/hooks";
import { setUserData } from "@/lib/features/user.slice";
import { NEXT_PUBLIC_CLIENT_ID, NEXT_PUBLIC_REDIRECT_URI } from "@/app/config/global-vars";
import { useHandleError } from "@/app/hooks/use-handle-errors";
import { showNotification } from "@/app/utils/notification";

interface Props {
    code?: string;
    error?: string;
}

export default function LoginButton({ code, error }: Props) {
    const params = `response_type=code&client_id=${NEXT_PUBLIC_CLIENT_ID}&scope=user-read-private user-read-email user-library-modify user-library-read&redirect_uri=${encodeURI(NEXT_PUBLIC_REDIRECT_URI)}`;
    const dispatch = useAppDispatch();
    const handleError = useHandleError();

    const [
        authenticate,
        {
            isSuccess,
            isError,
            error: authError,
            isLoading,
            data,
        }
    ] = useAuthenticateMutation();

    useEffect(() => {
        if (code) {
            authenticate({
                code
            })
        }

        if(error) {
            showNotification(error);
        }
    }, [code, error])

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUserData({
                ...data,
                expires_in: Date.now() + (data.expires_in * 1000)
            }));
            localStorage.setItem('user', JSON.stringify(data));
            redirect('/');
        }
        if (isError) {
            handleError(authError)
        }
    }, [isSuccess, isError])

    return (
        <Link
            href={`https://accounts.spotify.com/authorize?${params}`}
            className="font-semibold sm:mt-5 flex items-center gap-6"
        >

            Log in con Spotify
            {
                isLoading
                    ? <div className="h-[14px] w-[16px] rounded-full border-2 animate-spin" />
                    : <Image src={'/icons/arrow-right.svg'} width={16} height={14} alt="arrow" />
            }
        </Link>
    )
}
