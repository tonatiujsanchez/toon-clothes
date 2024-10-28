import { ProductGrid } from "@/components/product-grid";
import { Product } from "@/models";
import { notFound } from "next/navigation";


const categories = ['hombre', 'mujer', 'kids']

interface Props {
    params: {
        category: string
    }
}
export default async function CategoryPage({ params }:Props) {

    if( !categories.includes(params.category) ){
        notFound()
    }

    const productsByCategoryDB = await Product.find({ category: params.category })

    return (
        <main className="container py-10">
            <ProductGrid products={ productsByCategoryDB } />
        </main>
    );
}