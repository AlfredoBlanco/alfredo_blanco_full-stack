import Image from "next/image";
import LoginButton from "./components/login-button";

export default function Page({ searchParams }: { searchParams: { code?: string, error?: string } }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-between sm:px-6">
            <Image src={'/icons/complete-logo.svg'} width={133} height={24} alt='Logo' className="self-start" />
            <div className="w-full max-w-6xl h-full lg:h-fit lg:my-auto flex flex-col items-center justify-center gap-5 sm:items-start sm:self-start lg:flex-row lg:justify-evenly lg:items-center lg:self-center">
                <Image src={'/icons/main-arrow.svg'} width={464} height={464.5} alt="arrow" className="w-[222px] sm:w-[318px] lg:w-[464px]" />
                <div className="lg:h-full flex flex-col items-start gap-6">
                    <h1 className="font-bold text-[40px] sm:text-[64px]">
                        Disfruta de la<br /><span className="text-main-green">mejor música</span>
                    </h1>
                    <h4 className="font-normal">
                        Accede a tu cuenta para guardar tus<br />albumes favoritos.
                    </h4>
                    <LoginButton code={searchParams.code} error={searchParams.error} />
                </div>
            </div>
        </div>
    )
}
