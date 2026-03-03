import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function getSession(request: NextRequest, origin: string) {
    try {
        const res = await fetch(`${origin}/api/auth/get-session`, {
            headers: { cookie: request.headers.get("cookie") || "" },
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data?.user || null;
    } catch {
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    // 1. Admin Portal Access (/admin/*)
    if (url.pathname.startsWith('/admin')) {
        // Allow public access to the admin login page
        if (url.pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Verify session using better-auth's own API
        const user = await getSession(request, url.origin);

        if (!user || user.role !== 'admin') {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // 2. Client Dashboard authentication
    if (url.pathname.startsWith('/dashboard')) {
        const user = await getSession(request, url.origin);

        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/dashboard/:path*'
    ],
};
