import mongoose from "mongoose";
import { IProduct, ProductModel} from "../Models/productModel";



type ProductData = Partial<IProduct>
type ProductDataInterface = Pick<IProduct, "name" | "description" | "price" | "category" | "stock"> & {updateProd: string}

class ProductService{

    static async addProduct(data:ProductData){

        const product = await new ProductModel({...data})
        product.save()
        return product
    }


    static async getProduct(data:ProductData){

        try {
            const findProduct = await ProductModel.findOne({name: data.name}).exec()
            if(!findProduct){
                throw new Error("Name does not exist")
            }
            return findProduct
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error (500)")
        }
    }

    static async updateProduct(data:ProductDataInterface){

        try {
            const update = await ProductModel.findOneAndUpdate({name: data.name,}, {name: data.updateProd}, {new: true, runValidators: true}).exec()
            if(!update){
                throw new Error("Product name does not exist")
            }

            return update
        
            
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error (500")
        }

        
    }




    static async deleteProduct(data:ProductData){

        try {
            const deleteProduct = await ProductModel.findOneAndDelete({name: data.name}).exec()
            if(!deleteProduct){
                throw new Error("Error deleting product")
            }
            
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error (500")
        }
    }
}

export default ProductService