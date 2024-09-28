import { products } from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import { currencyFormatMXN } from "@/utils";
import { AddProductToCart } from "@/components/add-product-to-cart";


export const metadata = {
    title: 'Producto',
    description: 'Descripción del Producto',
};

interface Props {
    params : {
        slug: string
    }
}
export default function ProductPage({ params }:Props) {

    // Consultar de la base datos
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
                        width={700}
                        height={700}
                        className="bg-slate-100"
                    />
                </figure>
                <div>
                    <h1 className="font-extrabold text-4xl mb-5">{ product.title }</h1>
                    <p className="text-2xl font-bold mb-5">{ currencyFormatMXN(product.price) }</p>
                    <AddProductToCart product={product} >
                        <p className="text-xl mb-10 text-pretty">{product.description}</p>
                    </AddProductToCart>
                </div>
            </div>
        </main>
    );
}