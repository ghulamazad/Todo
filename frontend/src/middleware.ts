import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getLoginUser } from './services/auth.service';

export async function middleware(request: NextRequest) {
    let user;
    try {
        const data = await getLoginUser();
        user = data.data;
    } catch (err) {
        user = null;
    }
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)',
}