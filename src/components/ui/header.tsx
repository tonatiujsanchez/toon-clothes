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
                        <NavLink href="/carrito">Carrito</NavLink>
                    </li>
                    <li>
                        <NavLink href="/iniciar-sesion">Ingresar</NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}
