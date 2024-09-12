import { ProductGrid } from "@/components/product-grid";
import { products } from "@/data/products";


interface Props {
    params: {
        category: string
    }
}
export default function CategoryPage({ params }:Props) {

    const productsByCategory = products.filter( product => product.category === params.category )
    
    return (
        <main className="container py-10">
            <ProductGrid products={ productsByCategory } />
        </main>
    );
}