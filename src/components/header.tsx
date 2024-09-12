import Link from "next/link"

export const Header = () => {
    return (
        <header className="border-b">
            <div className="container flex justify-between items-center py-4">
                <Link className="font-black uppercase text-orange-500" href="/">LOGO</Link>
                <nav>
                    <ul className="flex gap-5 items-center">
                        <li>
                            <Link href="/hombre" className="font-bold opacity-60 uppercase text-sm">Hombre</Link>
                        </li>
                        <li>
                            <Link href="/mujer" className="font-bold opacity-60 uppercase text-sm">Mujer</Link>
                        </li>
                        <li>
                            <Link href="/nosotros" className="font-bold opacity-60 uppercase text-sm">Nosotros</Link>
                        </li>
                        <li>
                            <Link href="/carrito" className="font-bold opacity-60 uppercase text-sm">Carrito</Link>
                        </li>
                        <li>
                            <Link href="/iniciar-sesion" className="font-bold opacity-60 uppercase text-sm">Ingresar</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
