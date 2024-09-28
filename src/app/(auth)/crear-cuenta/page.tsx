
export default function RegisterPage() {
    return (
        <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm">Nombre</label>
                <input
                    name="name"
                    id="name"
                    type="text"
                    className="rounded-md border px-4 py-2"
                    placeholder="Ingrese su nombre"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm">Correo</label>
                <input
                    name="email"
                    id="email"
                    type="email"
                    className="rounded-md border px-4 py-2"
                    placeholder="Ingrese su correo"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm">Contraseña</label>
                <input
                    name="password"
                    id="password"
                    type="password"
                    className="rounded-md border px-4 py-2"
                    placeholder="Ingrese su contraseña"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="passwordConfirm" className="text-sm">Confirmar contraseña</label>
                <input
                    name="passwordConfirm"
                    id="passwordConfirm"
                    type="password"
                    className="rounded-md border px-4 py-2"
                    placeholder="Confirme su contraseña"
                />
            </div>
            <div className="mt-2">
                <button
                    className="bg-orange-600 text-white px-5 py-2 rounded-md font-bold mb-5 w-full flex items-center justify-center"
                >
                    Crear Cuenta
                </button>
            </div>
        </form>
    );
}