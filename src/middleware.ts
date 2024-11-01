import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import * as jose from 'jose'


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const cookieStore = cookies()
    const token = cookieStore.get('toon-clothes-token')
    const { protocol, host } = request.nextUrl 

    
    // ===== usuarios autenticados =====
    if( 
        // request.nextUrl.pathname.startsWith('/carrito') ||
        request.nextUrl.pathname.startsWith('/profile')
     ){

        if( !token ){
            // return NextResponse.redirect( new URL('/iniciar-sesion', request.url) )
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)    
        }
        
        try {
            // Validar token
            const { payload } = await jose.jwtVerify(String(token.value), new TextEncoder().encode(process.env.JWT_SECRET_KEY))
            // const payload = jwt.verify(token, process.env.JWT_SECRET_KEY) as { _id: string; role: IUserRol };
            console.log(payload)
            return NextResponse.next()
        } catch (error) {
            console.log(error)
            // return NextResponse.redirect( new URL('/iniciar-sesion', request.url) )
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)     
        }
    }


    if(  
        request.nextUrl.pathname.startsWith('/iniciar-sesion') || 
        request.nextUrl.pathname.startsWith('/crear-cuenta') 
    ){
        if( !token ){ return NextResponse.next() }
        try {
            await jose.jwtVerify(String(token.value), new TextEncoder().encode(process.env.JWT_SECRET_KEY))
            // return NextResponse.redirect( new URL('/', request.url) )
            return NextResponse.redirect(`${protocol}//${host}/`)

        } catch (error) {
            console.log(error)
            return NextResponse.next()   
        }
    }

}


// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/carrito',
        '/profile',

        '/iniciar-sesion',
        '/crear-cuenta',
    ],
    // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
    // matcher: '/about/:path*',
}