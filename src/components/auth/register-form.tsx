'use client'

import { login } from "@/store/auth/authSlice"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"


interface RegisterFromData {
    name: string
    email: string
    password: string
    passwordConfirm: string
}
export const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFromData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        }
    })
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const router =  useRouter()

    const passwordRef = useRef({})
    passwordRef.current = watch('password', '')


    const handleRegisterSubmit = async (formData: RegisterFromData) => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/auth/register', {
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
            router.replace('/')

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                // TODO: Mostrar el mensaje del error
            } else {
                console.log('Error desconocido');
            }
        }finally {
            setIsLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(handleRegisterSubmit)}
            className="flex flex-col gap-4"
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm">Nombre</label>
                <input
                    id="name"
                    type="text"
                    className="rounded-md border px-4 py-2"
                    placeholder="Ingrese su nombre"
                    {...register('name', {
                        required: 'El nombre es obligatorio',
                        minLength: { value: 2, message: 'El nombre es muy corto, debe tener mínimo 2 caracteres' }
                    })}
                />
                {errors.name && (
                    <span className="text-xs text-red-700">{errors.name.message}</span>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm">Correo</label>
                <input
                    id="email"
                    type="email"
                    className="rounded-md border px-4 py-2"
                    placeholder="Ingrese su correo"
                    {...register('email', {
                        required: 'Ingrese su correo'
                    })}
                />
                {errors.email && (
                    <span className="text-xs text-red-700">{errors.email.message}</span>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    className="rounded-md border px-4 py-2"
                    placeholder="Ingrese su contraseña"
                    {...register('password', {
                        required: 'Ingrese una contraseña',
                        minLength: { value: 6, message: 'La contraseña es muy corta, ingrese mínimo 6 caracteres' }
                    })}
                />
                {errors.password && (
                    <span className="text-xs text-red-700">{errors.password.message}</span>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="passwordConfirm" className="text-sm">Confirmar contraseña</label>
                <input
                    id="passwordConfirm"
                    type="password"
                    className="rounded-md border px-4 py-2"
                    placeholder="Confirme su contraseña"
                    {...register('passwordConfirm', {
                        required: 'Confirme la contraseña',
                        validate: (value) => value !== passwordRef.current ? 'Las contraseña no coinciden' : undefined
                    })}
                />
                {errors.passwordConfirm && (
                    <span className="text-xs text-red-700">{errors.passwordConfirm.message}</span>
                )}
            </div>
            <div className="mt-2">
                <button
                    disabled={ isLoading }
                    className="bg-orange-600 text-white px-5 py-2 rounded-md font-bold mb-5 w-full flex items-center justify-center disabled:bg-orange-400"
                >
                    {
                        isLoading
                        ? 'Cargando...'
                        : 'Crear Cuenta'
                    }
                </button>
            </div>
        </form>
    )
}
