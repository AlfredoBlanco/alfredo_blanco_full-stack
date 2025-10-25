import { selectUser } from '@/lib/features/user.slice'
import { useAppSelector } from '@/lib/hooks'
import React, { InputHTMLAttributes, useEffect, useState } from 'react'


interface Props {
    handleSearch: any;
}

export default function SearchForm({ handleSearch }: Props) {
    const [query, setQuery] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch(query);

    }

    return (
        <form onSubmit={handleSubmit} className='w-full max-w-[665px] bg-white p-3 self-center flex items-center gap-4 rounded-3xl'>
            <input
                name='query'
                value={query}
                onChange={handleChange}
                className='w-full text-black bg-transparent border-none borderless-input'
            />
            <button type='submit' className='p-3 px-8 bg-main-green text-black font-semibold rounded-full'>
                Buscar
            </button>
        </form>
    )
}
