import { IUserRol } from '@/interfaces'
import jwt, { type SignOptions } from 'jsonwebtoken'

export const signToken = (_id: string, role: IUserRol) =>  {

    if(!process.env.JWT_SECRET_KEY){
        throw new Error('Variable de entorno JWT_SECRET_KEY no está definida')
    }

    const payload = {
        _id,
        role
    }

    const options:SignOptions = {
        expiresIn: '30d'
    }

    return jwt.sign( payload, process.env.JWT_SECRET_KEY, options )
}