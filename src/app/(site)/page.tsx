import { ProductGrid } from "@/components/product-grid"
import { Product } from "@/models"

export default async function Home() {

    const productsDB = await Product.find()
    
    return (
        <>            
            <main className="container py-10">
                <ProductGrid products={ productsDB } />
            </main>
        </>
    )
}
