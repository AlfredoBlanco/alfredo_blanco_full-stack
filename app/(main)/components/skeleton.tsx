
export default function Skeleton() {
    return (
        <>
            {
                [0, 1].map((e) => (
                    <div key={`sk-${e}`} className="w-[290px] max-w-full h-[400px] p-4 my-2 rounded-2xl animate-pulse bg-stone-50/30">
                        <div className="rounded-2xl w-full h-[241px] bg-black/10 " />
                    </div>
                ))
            }
        </>
    )
}
