'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
    children  : React.ReactNode
    href      : string
    className?:string
}

export const NavLink = ({ children, href, className="" }: Props) => {

    const pathname = usePathname()

    return (
        <Link 
            href={ href } 
            className={`font-bold uppercase text-sm ${ className } ${ pathname.startsWith(href) ? 'text-orange-500' : 'text-gray-800 hover:underline' }`}
        >
            { children }
        </Link>
    )
}
