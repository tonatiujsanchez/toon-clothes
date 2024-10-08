'use client'

import { useForm } from "react-hook-form"
import { isEmail } from "@/utils"
import { useState } from "react"
import { setCookie } from "cookies-next"
import { login } from "@/store/auth/authSlice"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"


interface LoginFromData{
    email   : string
    password:string
}
export const LoginForm = () => {

    const { register, handleSubmit, formState:{ errors } } = useForm<LoginFromData>()
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const router =  useRouter()


    const handleLoginForm = async(formData: LoginFromData) => {
        setLoading(true)
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.msg);
            }

            // Guardar token en las cookies
            setCookie('toon-clothes-token', data.token)

            // Hacer el dispatch de autenticación
            dispatch( login( data.user ) )

            // Redirigir al usuario
            // router.replace('/')
            router.refresh()

        } catch (error) {
            console.log('CATH => ', error)
            if (error instanceof Error) {
                console.log(error.message);
                // TODO: Mostrar el mensaje del error
            } else {
                console.log('Error desconocido');
            }
        }finally {
            setLoading(false)
        }

    }

    return (
        <form
            onSubmit={ handleSubmit( handleLoginForm ) }
            className="flex flex-col gap-4"
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm">Correo</label>
                <input
                    id="email"
                    type="email"
                    className="rounded-md border px-4 py-2"
                    placeholder="Ingrese su correo"
                    { ...register('email', {
                        required: 'Ingrese su correo',
                        validate: ( value ) => isEmail( value )
                    })}
                />
                { errors.email && (
                    <span className="text-xs text-red-700">{ errors.email.message }</span>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    className="rounded-md border px-4 py-2"
                    placeholder="Ingrese su contraseña"
                    { ...register('password', {
                        required: 'Ingrese una contraseña',
                    })}
                />
                { errors.password && (
                    <span className="text-xs text-red-700">{ errors.password.message }</span>
                )}
            </div>
            <div className="mt-2">
                <button
                    disabled={ loading }
                    className="bg-orange-600 text-white px-5 py-2 rounded-md font-bold mb-5 w-full flex items-center justify-center disabled:opacity-35"
                >
                    {
                        loading
                        ? 'Cargando...'
                        : 'Iniciar Sesión'
                    }
                </button>
            </div>
        </form>
    )
}
