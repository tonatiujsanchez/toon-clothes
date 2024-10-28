import { connectDB } from "@/libs/mongodb";
import { User } from "@/models";
import { jwt } from "@/utils";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function NameProfilePage() {

    const cookieStore = cookies()
    const token = cookieStore.get('toon-clothes-token')
    
    if( !token ){
        notFound()
    }

    const { _id } = await jwt.verifyToken( token.value )

    await connectDB()
    const user = await User.findById(_id)

    if( !user ){
        notFound()
    }

    return (
        <main className="px-5 py-10">
            <h1 className="text-4xl font-bold">{ user.name }</h1>
        </main>
    );
}