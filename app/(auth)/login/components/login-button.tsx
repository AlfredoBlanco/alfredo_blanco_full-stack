'use client'
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { generateRandomString } from "@/app/utils/generate-random";
import { useEffect } from "react";
import axios from "axios";
import { useAuthenticateMutation } from "@/lib/services/auth-service";
import { useAppDispatch } from "@/lib/hooks";
import { setUserData } from "@/lib/features/user.slice";

interface Props {
    code?: string;
    error?: string;
}

export default function LoginButton({ code, error }: Props) {
    const params = `response_type=code&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&scope=user-read-private user-read-email&redirect_uri=${encodeURI('https://a7344b39bb31.ngrok-free.app/login')}`;
    const dispatch = useAppDispatch();

    const [
        authenticate,
        {
            isSuccess,
            isError,
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
    }, [code])

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUserData({
                ...data,
                expires_in: Date.now() + (data.expires_in * 1000)
            }));
            localStorage.setItem('user', JSON.stringify(data));
        }
        if (isError) {
            console.log('Hubo un error')
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
