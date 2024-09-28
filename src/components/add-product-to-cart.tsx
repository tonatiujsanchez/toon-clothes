'use client'
import { Product } from "@/interfaces/Product"
import { useState } from "react"


interface Props {
    product: Product
    children: React.ReactNode
}
export const AddProductToCart = ({ product, children }: Props) => {

    const [sizeSelected, setSizeSelected] = useState<string>()
    const [quantity, setQuantity] = useState<number>(1)


    const handleSetAddQuantity = () => {
        if( quantity < product.inStock ){
            setQuantity(quantity + 1)
        }
    }

    const handleSetRemoveQuantity = () => {
        if( quantity > 1 ){
            setQuantity(quantity - 1)
        }
    }


    const handleAddProductToCart = () => {

        if( !sizeSelected ){
            return console.log('Seleccione una talla')
        }

        // Agregar al carrito
        console.log(sizeSelected)

    }


    return (
        <div>
            <div className="mb-5 flex items-center gap-2">
                {
                    product.sizes.map(size => (
                        <button 
                            key={size} 
                            className={`px-4 py-2 border rounded-sm hover:bg-gray-100 ${ size === sizeSelected ? 'border-orange-600' : undefined }`}
                            onClick={ ()=> setSizeSelected(size) }
                        >
                            {size}
                        </button>
                    ))
                }
            </div>
            <div>
                <p className="font-semibold mb-1">Cantidad:</p>
                <div className="flex items-center gap-4 mb-4">
                    <button 
                        onClick={ handleSetRemoveQuantity } 
                        className="border w-7 h-7 flex justify-center items-center rounded-md hover:bg-gray-200 active:scale-97"
                    >
                        <span>-</span>
                    </button>
                    <span>{ quantity }</span>
                    <button
                        onClick={ handleSetAddQuantity } 
                        className="border w-7 h-7 flex justify-center items-center rounded-md hover:bg-gray-200 active:scale-95"
                    >
                        <span>+</span>
                    </button>
                </div>
            </div>
            { children }
            <button
                 onClick={ handleAddProductToCart }
                className="bg-orange-600 text-white px-5 py-3 rounded font-bold mb-5 w-full lg:w-1/2 flex items-center justify-center overflow-hidden group active:scale-[0.97] transition"

            >
                <span className="transition duration-500 -translate-x-80 group-hover:translate-x-8">🛒</span>
                <span className="transition duration-500 -translate-x-2 group-hover:translate-x-96 object-fill">Agregar</span>
            </button>
        </div>
    )
}
