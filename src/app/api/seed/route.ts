import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import { Product } from "@/models";
import { products } from "@/data/products";


export async function GET(){

    if( process.env.NODE_ENV === 'production' ){
        return NextResponse.json(
            { msg: 'Not available' }, 
            { status: 404 }
        )
    }    

    await connectDB()
    
    // Seed to Products
    await Product.deleteMany()
    await Product.insertMany( products )


    
    return NextResponse.json(
        { msg: 'OK! ✅' }, 
        { status: 201 }
    )
}
