'use client'

import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store"
import { IoPersonCircleOutline } from "react-icons/io5"
import { startLogout } from "@/store/auth/authThunks"
import { useRouter } from "next/navigation"



export const UserAuth = () => {

    const { user, status } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()


    const handleLogout = () => {
        dispatch( startLogout() )
        router.refresh()
    }

    if( status === 'checking' ){
        return (
            <div className="w-16 h-6 bg-gray-300"></div>
        )
    }

    return (
        user
            ? (
                <div className="flex items-center gap-3">
                    <span>{ user.name }</span>
                    <button
                        onClick={ handleLogout }
                    >
                        Salir
                    </button>
                </div>
            ): (
                <Link 
                    href = "/iniciar-sesion"
                    className = "text-2xl text-gray-950 hover:scale-110"
                >
                    <IoPersonCircleOutline />
                </Link >
)
    )
}
