'use client'

import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { IoPersonCircleOutline } from "react-icons/io5"



export const UserAuth = () => {

    const { user } = useSelector((state: RootState) => state.auth)

    return (
        user
            ? (
                <span>{ user.name }</span>
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
