import { IProduct } from "@/interfaces";
import { model, Model, models, Schema } from "mongoose";


const ProductSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ['hombre', 'mujer', 'kids'],
            message: '{VALUE} no es una categoría válida'
        },
    },
    price: {
        type: Number,
        required: true
    },
    sizes: [
        {
            type: String,
            required: true,
            enum: {
                values: ['CH', 'M', 'G', 'EG', '4', '6', '8', '10'],
                message: '{VALUE} no es una talla válida'
            },
        }
    ],
    inStock: {
        type: Number,
        required: true,
        default: 0
    },
    images:[
        {
            type: String,
            required: true
        }
    ],
    slug:{ 
        type: String,
        required: true,
        unique: true
    }
})

const Product:Model<IProduct> = models.Product || model('Product', ProductSchema)

export default Product