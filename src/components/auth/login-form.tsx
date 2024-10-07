'use client'

import { useForm } from "react-hook-form"
import { isEmail } from "@/utils"


interface LoginFromData{
    email   : string
    password:string
}
export const LoginForm = () => {

    const { register, handleSubmit, formState:{ errors } } = useForm<LoginFromData>()

    const handleLoginForm = () => {
        console.log('Submit')
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
                    className="bg-orange-600 text-white px-5 py-2 rounded-md font-bold mb-5 w-full flex items-center justify-center"
                >
                    Iniciar Sesión
                </button>
            </div>
        </form>
    )
}
