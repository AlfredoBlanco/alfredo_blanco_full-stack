import axios from 'axios';
import { NextResponse } from 'next/server';
import type { AxiosError } from 'axios';

export async function POST(req: Request) {
    const reqBody = await req.json();
    const body = new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': reqBody.code,
        'redirect_uri': 'https://a7344b39bb31.ngrok-free.app/login'
    }).toString();
    
    try {
        const res = await axios.post('https://accounts.spotify.com/api/token', body, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(process.env.NEXT_PUBLIC_CLIENT_ID + ':' + process.env.NEXT_PUBLIC_CLIENT_SECRET).toString('base64'))
            }
        })

        return NextResponse.json(res.data);

    } catch (e: AxiosError | any) {
        console.log('e', e.response);
        return NextResponse.error();
    }

}
