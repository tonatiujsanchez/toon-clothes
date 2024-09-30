import { IoCartOutline, IoPersonCircleOutline } from "react-icons/io5"
import Link from "next/link"
import { NavLink } from "./nav-link"

export const Header = () => {
    return (
        <header className="border-b">
            <div className="container flex justify-between items-center py-4">
                <div className="flex gap-5 items-center">
                    <Link className="font-black uppercase text-orange-500" href="/">LOGO</Link>
                    <nav>
                        <ul className="flex gap-5 items-center">
                            <li>
                                <NavLink href="/hombre">Hombre</NavLink>
                            </li>
                            <li>
                                <NavLink href="/mujer">Mujer</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                <ul className="flex gap-5">
                    <li>
                        <Link 
                            href="/carrito"
                            className="relative text-2xl text-gray-950 hover:scale-110"
                        >
                            <IoCartOutline />
                            {
                                5 > 0 && (
                                    <span className="absolute -top-1 -right-2 text-[0.7rem] w-4 h-4 rounded-full text-white bg-sky-600 flex items-center justify-center">{5}</span>
                                )
                            }
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/iniciar-sesion"
                            className="text-2xl text-gray-950 hover:scale-110"
                        >
                            <IoPersonCircleOutline />
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}
