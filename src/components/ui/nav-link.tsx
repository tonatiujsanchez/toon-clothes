'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
    children: React.ReactNode
    href: string
}

export const NavLink = ({ children, href }: Props) => {

    const pathname = usePathname()

    return (
        <Link 
            href={ href } 
            className={`font-bold uppercase text-sm ${ pathname.startsWith(href) ? 'text-orange-500' : 'text-gray-800 hover:underline' }`}
        >
            { children }
        </Link>
    )
}
