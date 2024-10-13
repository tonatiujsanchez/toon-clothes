'use client'

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCookie } from "cookies-next";
import { AppDispatch } from "./";
import { useEffect } from "react";
import { login } from "./auth/authSlice";
import { startLogout } from "./auth/authThunks";

export const InitializerState = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    const validateSession = async() => {
        
        try {
            const res = await fetch('/api/auth/validate-session')
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.msg);
            }

            // Guardar token en las cookies
            setCookie('toon-clothes-token', data.token)

            // Hacer el dispatch de autenticación
            dispatch( login( data.user ) )
   
        } catch (error) {
            dispatch( startLogout() )
            router.refresh()
        }
    }
    
    useEffect(()=>{
        validateSession()
    },[])

    return null
}
