import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { connectDB } from "@/libs/mongodb";
import { isValidEmail } from "@/utils";
import { User } from "@/models";


export async function POST( request: NextRequest ){

    const { name='', email='', password='' } = await request.json()

    if( name.trim() === '' ){
        return NextResponse.json({ msg: 'El nombre es requerido' }, { status: 400 })
    }

    if( email.trim() === '' ){
        return NextResponse.json({ msg: 'El correo es requerido' }, { status: 400 })
    }

    if( !isValidEmail( email ) ){
        return NextResponse.json({ msg: 'El correo no es válido' }, { status: 400 })
    }

    if( password.trim() === '' ){
        return NextResponse.json({ msg: 'La contraseña es requerida' }, { status: 400 })
    }

    if( password.trim().length < 6 ){
        return NextResponse.json({ msg: 'La contraseña es muy corta, ingrese mínimo 6 caracteres' }, { status: 400 })
    }        
    
    try {
        await connectDB()

        const userDB = await User.findOne({ email })

        if( userDB ){
            return NextResponse.json({ msg: 'Ya existe un usuario registrado con ese correo' }, { status: 400 })
        }
        
        const encryptedPassword = bcryptjs.hashSync(password)

        const user = new User({
            name,
            email, 
            password: encryptedPassword
        })

        await user.save()

        // Agregar un token y poner en confirm en false

        // Enviar correo de confirmación
                
        return NextResponse.json(user)

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { msg: 'Error en el servidor, comuníquese con el administrador' },
            { status: 500 }
        )
    }
    



}