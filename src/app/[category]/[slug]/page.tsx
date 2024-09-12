import { products } from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
    params : {
        slug: string
    }
}
export default function ProductPage({ params }:Props) {

    const product = products.find( prod => prod.slug === params.slug )

    if( !product ){
        notFound()
    }

    return (
        <main>
            <div className="container py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                <figure>
                    <Image
                        src={`/products/${product.images[0]}`}
                        alt={ product.title }
                        width={960}
                        height={960}
                    />
                </figure>
                <div>
                    <h1 className="font-extrabold text-4xl mb-5">{ product.title }</h1>
                    <p className="text-2xl font-bold mb-5">${ product.price }.00</p>
                    <div className="mb-5 flex items-center gap-2">
                        {
                            product.sizes.map( size => (
                                <button key={size} className="px-4 py-2 border rounded-sm hover:bg-gray-100">{ size }</button>
                            ))
                        }
                    </div>
                    <button className="bg-orange-600 text-white px-10 py-2 rounded font-bold mb-5 w-full lg:w-1/2">
                        Agregar al carrito
                    </button>
                    <p className="text-xl mb-10 text-pretty">{product.description}</p>
                </div>
            </div>
        </main>
    );
}