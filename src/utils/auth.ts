import { cookies } from "next/headers"
import { verifyToken } from "./jwt"



export const verifyAuth = async():Promise<boolean> => {
    try {

        // Verificar sesión
        const token = await cookies().get('toon-clothes-token')
        console.log(token)

        if( !token ){
            return false
        }

        await verifyToken( token.value )

        return true

    } catch (error) {
        return false
    }
}