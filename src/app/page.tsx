import { ProductGrid } from "@/components/product-grid"
import { products } from "@/data/products"

export default function Home() {
    return (
        <>            
            <main className="container py-10">
                <ProductGrid products={ products } />
            </main>
        </>
    )
}
