
import mongoose, {Document, Schema, model} from "mongoose";


// interface IProductImage  {
//     uri: string, alt?: string
// }

export interface IProduct extends Document{

    name: string
    description: string
    price: number
    category: string
    stock: number
    // images: IProductImage[]
    // isActive: boolean
    // createdAt: Date
    // updatedAt: Date

}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price must be a positive number"]
    },
    category: {
        type: String,
        required: [true, "Product category is required"]
    },
    stock: {
        type: Number,
        required: [true, "Stock amount is required"],
        min: [0, "Stock ammount cannot be negative"]
    }
    // images: [
    //     {
    //         uri: {
    //             type: String,
    //             required: [true, "Image URI is required"]
    //         },
    //         alt: {
    //             type: String,
                
    //         }
    //     }
    // ], //End of images defintions
    // isActive:{
    //     type: Boolean,
    //     required: true
    // },
    // createdAt:{
    //     type: Date,
    //     required: [true, "Must include time of creation"]
    // },
    // updatedAt:{
    //     type: Date,
    //     required: [true, "Must state updated time "]
    // }
}, {timestamps: true, virtuals: true})



export const ProductModel = model<IProduct>("Product", productSchema)