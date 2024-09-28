import { ProductGrid } from "@/components/product-grid";
import { products } from "@/data/products";
import { notFound } from "next/navigation";


const categories = ['hombre', 'mujer']

interface Props {
    params: {
        category: string
    }
}
export default function CategoryPage({ params }:Props) {

    if( !categories.includes(params.category) ){
        notFound()
    }

    const productsByCategory = products.filter( product => product.category === params.category )
    
    return (
        <main className="container py-10">
            <ProductGrid products={ productsByCategory } />
        </main>
    );
}