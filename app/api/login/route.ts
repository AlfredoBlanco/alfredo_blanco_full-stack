import axios from 'axios';
import { NextResponse } from 'next/server';
import type { AxiosError } from 'axios';
import { NEXT_PUBLIC_CLIENT_ID, NEXT_PUBLIC_CLIENT_SECRET, NEXT_PUBLIC_REDIRECT_URI } from '@/app/config/global-vars';

export async function POST(req: Request) {
    const reqBody = await req.json();
    const body = new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': reqBody.code,
        'redirect_uri': NEXT_PUBLIC_REDIRECT_URI
    }).toString();
    
    try {
        const res = await axios.post('https://accounts.spotify.com/api/token', body, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(NEXT_PUBLIC_CLIENT_ID + ':' + NEXT_PUBLIC_CLIENT_SECRET).toString('base64'))
            }
        })

        return NextResponse.json(res.data);

    } catch (e: AxiosError | any) {
        console.log('e', e.response);
        return NextResponse.error();
    }

}
