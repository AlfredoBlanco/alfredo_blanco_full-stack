'use client'
import { clearUserLogOut } from "@/lib/features/user.slice";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const location = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const items = [
        {
            href: '/',
            label: 'Buscar'
        },
        {
            href: '/my-albums',
            label: 'Mis albumes'
        }
    ];

    const handleLogout = async () => {
        dispatch(clearUserLogOut());
        router.push('/login');
    };

    return (
        <div className='w-full sticky top-0 left-0 flex items-center justify-end gap-4 lg:p-6'>
            <Link href={'/'} className="mr-auto">
                <Image src={'/icons/complete-logo.svg'} width={133} height={24} alt='Logo' className="hidden sm:block" />
                <Image src={'/icons/small-logo.svg'} width={26} height={27} alt='Small Logo' className="sm:hidden" />
            </Link>

            {
                items.map((e, i) => (
                    <Link href={e.href} key={i} className={`font-semibold ${location === e.href ? 'text-main-green' : ''}`}>
                        {e.label}
                    </Link>
                ))
            }
            <div className="w-[25px] border-[1px] border-white rotate-90" />
            <button onClick={handleLogout} className="cursor-pointer">
                <Image src={'/icons/logout.svg'} width={24} height={18} alt='Small Logo' className="self-start sm:hidden" />
                <p className="font-semibold hidden sm:block">Cerrar sesión</p>
            </button>
        </div>
    )
}
