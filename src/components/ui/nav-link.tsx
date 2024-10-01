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
            className={`relative py-1 font-bold uppercase text-sm ${ className } ${ pathname.startsWith(href) ? 'text-orange-500' : 'text-gray-800 before:h-[0.2rem] before:rounded-xl before:w-full before:bg-orange-600 before:absolute before:inset-x-0 before:bottom-0 before:scale-0 hover:before:scale-100 before:transition' }`}
        >
            { children }
        </Link>
    )
}
