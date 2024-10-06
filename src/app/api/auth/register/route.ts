import { NextResponse } from "next/server";


export function POST( request: Request ){

    const body = request.json()

    console.log(body)

    
    return NextResponse.json({ msg: 'Register' })
}