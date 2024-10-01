import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";


export async function GET(){

    if( process.env.NODE_ENV === 'production' ){
        return NextResponse.json(
            { msg: 'Not available' }, 
            { status: 404 }
        )
    }    

    await connectDB()

    
    return NextResponse.json(
        { msg: 'Hola desde seed...' }, 
        { status: 201 }
    )
}