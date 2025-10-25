import { generatePages } from "@/app/utils/generate-pages";
import Image from "next/image";

interface Props {
    page: number;
    totalResults: number;
    onChange: any;
}

export default function Pagination({ page, totalResults, onChange }: Props) {

    const totalPages = Math.ceil(totalResults / 4);

    const handleSubstract = () => {
        if (page !== 1) {
            onChange(page - 1);
        }
    }

    const handleAdd = () => {
        if (page !== totalPages) {
            onChange(page + 1);
        }
    }

    if (totalPages < 1 || !totalResults) return <></>;

    return (
        <div className="flex items-center gap-4">
            <button onClick={handleSubstract} className="cursor-pointer">
                <Image src={'/icons/back-arrow.svg'} width={8} height={8} alt="prev page" />
            </button>
            {
                generatePages(page, totalPages).map((e, i) => {
                    if (e === '...') {
                        return <p key={`p-${i}`}> ... </p>
                    } else {
                        const targetPage = Number(e);
                        return (
                            <button
                                key={`p-${i}`}
                                onClick={() => onChange(targetPage)}
                                disabled={targetPage === page}
                                className={`text-sm cursor-pointer ${targetPage === page ? 'text-main-green' : ''}`}
                            >
                                {targetPage}
                            </button>
                        )
                    }
                })
            }

            <button onClick={handleAdd} className="cursor-pointer">
                <Image src={'/icons/back-arrow.svg'} width={8} height={8} alt="prev page" className="rotate-180" />
            </button>
        </div>
    )
}
