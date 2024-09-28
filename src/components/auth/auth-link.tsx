'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
    children: React.ReactNode
    href: string
}
export const AuthLink = ({ children, href }:Props) => {

    const pathname = usePathname()

    return (
        <Link
            className={`flex-1 text-center px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition duration-[0.4s] ${ pathname === href ? 'bg-orange-600 text-white' : 'bg-white' }`}
            href={href}
        >
            { children }
        </Link>
    )
}
