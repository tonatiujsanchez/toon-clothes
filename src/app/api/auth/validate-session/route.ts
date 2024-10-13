import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { jwt } from '@/utils';
import { connectDB } from '@/libs/mongodb';
import { User } from '@/models';


export async function GET() {

    const cookieStore = cookies()
    const token = cookieStore.get('toon-clothes-token')

    if( !token ){
        return NextResponse.json({ msg: 'Token de sesión no válido' },{ status: 400 });
    }

    let userId;

    try {
        
        const { _id } = await jwt.verifyToken( token.value )
        userId = _id

    } catch (error) {
        return NextResponse.json({ msg: 'Token de sesión no válido' },{ status: 400 });    
    }


    try {
        await connectDB()
        const user = await User.findById( userId )

        if( !user ){
            return NextResponse.json({ msg: 'Usuario no encontrado' }, { status: 400 })
        }

        const newToken = jwt.signToken( user._id, user.role )

        return NextResponse.json({
            token: newToken,
            user: {
                name  : user.name,
                email : user.email,
                role  : user.role,
                photo : user.photo
            }
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { msg: 'Error en el servidor, comuníquese con el administrador' },
            { status: 500 }
        )
    }

}