import { IUserRol } from '@/interfaces'
import jwt, { type SignOptions } from 'jsonwebtoken'

export const signToken = (_id: string, role: IUserRol) => {

    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('Variable de entorno JWT_SECRET_KEY no está definida')
    }

    const payload = {
        _id,
        role
    }

    const options: SignOptions = {
        expiresIn: '30d'
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, options)
}


export const verifyToken = (token: string): Promise<{ _id: string, role: IUserRol }> => {

    return new Promise((resolve, reject) => {

        if (!process.env.JWT_SECRET_KEY) {
            return reject('Variable de entorno JWT_SECRET_KEY no está definida')
        }

        try {
            // Verify
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
                if (err) {
                    return reject('El token no es valido')
                }

                resolve(payload as { _id: string, role: IUserRol }) //{ _id:string, role:IUserRol }
            })

        } catch (error) {
            reject('El token no es valido')
        }
    })

}


export const verifyTokenSync = (token: string): { _id: string; role: IUserRol } | null => {
    if (!process.env.JWT_SECRET_KEY) {
        console.error('Variable de entorno JWT_SECRET_KEY no está definida');
        return null;
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY) as { _id: string; role: IUserRol };
        return payload;
    } catch (error) {
        console.error('El token no es válido:', error);
        return null;
    }
};