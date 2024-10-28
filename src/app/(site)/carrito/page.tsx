import { ProductItemCart } from "@/components";
import { products } from "@/data/products";
import { currencyFormatMXN } from "@/utils";
import { verifyAuth } from "@/utils/auth";

export default async function CarPage() {

    const isValidSession = await verifyAuth()
    console.log(isValidSession)

    const cart = products.slice(0, 4).map(product => {
        const quantity = Math.floor(Math.random() * 10)
        const size = product.sizes[0]
        return { product, quantity, size }
    })

    const subTotal = cart.reduce((accumulator, { product, quantity })=>{
        const totalPerProduct = product.price * quantity
        return totalPerProduct + accumulator 
    },0)

    const tax = subTotal * 0.16

    const totalToPay =subTotal + tax  

    return (
        <main className="container py-10">
            <h1 className="text-3xl font-bold mb-5 md:mb-10">Mi carrito</h1>
            <ul className="divide-y divide-gray-200">
                {cart.map(({ product, quantity, size }) => (
                    <ProductItemCart
                        key={product.slug}
                        product={product}
                        quantity={quantity}
                        size={size}
                    />
                ))}
            </ul>
            <hr />
            <div className="py-3 flex flex-col gap-3 px-2">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-lg">Subtotal</span>
                    <span className="font-semibold">{ currencyFormatMXN(subTotal) }</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-lg">IVA (16%)</span>
                    <span className="font-semibold">{ currencyFormatMXN(tax) }</span>
                </div>
            </div>
            <hr />
            <div className="py-4 flex justify-between items-center px-2">
                <span className="text-xl font-bold uppercase">Total</span>
                <span className="text-2xl font-bold">{ currencyFormatMXN(totalToPay) }</span>
            </div>
            <div className="mt-2 flex md:justify-end">
                <button
                    className="bg-orange-600 text-white px-5 py-2 rounded-md font-bold mb-5 w-full md:w-80 flex items-center justify-center"
                >
                    Confirmar Pedido
                </button>
            </div>
        </main>
    );
}