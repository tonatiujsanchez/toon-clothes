import { connectDB } from '@/libs/mongodb';
import { User } from '@/models';
import { isValidEmail, jwt } from '@/utils';
import { NextResponse, NextRequest } from 'next/server'
import bcryptjs from 'bcryptjs';

export async function POST(req: NextRequest) {

    const { email='', password='' } = await req.json();

    if( email.trim() === '' ){
        return NextResponse.json({ msg: 'Correo y/o contraseña invalidas' }, { status: 400 })
    }

    if( !isValidEmail( email ) ){
        return NextResponse.json({ msg: 'Correo y/o contraseña invalidas' }, { status: 400 })
    }

    if( password.trim() === '' ){
        return NextResponse.json({ msg: 'Correo y/o contraseña invalidas' }, { status: 400 })
    }

    if( password.trim().length < 6 ){
        return NextResponse.json({ msg: 'Correo y/o contraseña invalidas' }, { status: 400 })
    }
    
    try {

        await connectDB()
        const user = await User.findOne({ email })

        if( !user ){
            return NextResponse.json({ msg: 'Correo y/o contraseña invalidas' }, { status: 400 })
        }

        // Comparar contraseña
        const isValidPassword = bcryptjs.compareSync(password, user.password)

        if( !isValidPassword ){
            return NextResponse.json({ msg: 'Correo y/o contraseña invalidas' }, { status: 400 })
        }

        const token = jwt.signToken( user._id, user.role )
        
        return NextResponse.json({
            token,
            user: {
                name  : user.name,
                email : user.email,
                role  : user.role,
                photo : user.photo
            }
        });
    } catch (error) {
        
        console.log(error)
        return NextResponse.json(
            { msg: 'Error en el servidor, comuníquese con el administrador' },
            { status: 500 }
        )
    }
}