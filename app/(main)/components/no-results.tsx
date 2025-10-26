import Image from "next/image";


export default function NoResults({ message = "Ha ocurrido un error inesperado" }: { message?: string }) {
    return (
        <div className="w-[290px] h-[400px] p-4 my-2 rounded-2xl bg-stone-50/30 flex flex-col items-center">
            <div className="rounded-2xl w-full h-[241px] bg-black/10 flex items-center justify-center">
                <Image src={'/icons/file.svg'} width={10} height={30} alt="err" className="w-[100px]" />
            </div>
            <p className="text-medium mt-5">{message}</p>
        </div>
    )
}
