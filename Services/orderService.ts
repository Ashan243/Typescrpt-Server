import mongoose from "mongoose";
import { Item, itemModel, IOrder, orderModel,  } from "../Models/orderModel";
import _ from "lodash"
import cuid = require("cuid");


type ItemDetails = Partial<Item>
type ItemDataInterface = Pick<ItemDetails, "product" | "price" | "quantity">
type ODetails = Partial<IOrder>
type ODetailsInterface = Pick<ODetails, "id"| "user" | "items" | "orderStatus" | "paymentDetails">



class ItemService{

    static async addItem(itemData:ItemDetails){
        
        const item = new itemModel({...itemData})
        item.save()
        return item
    }


    static async getItem(itemData:Item){

        try {
        const item = await itemModel.findOne({product: itemData.product})
        if(!item){
            throw new Error("Item could not be found")
        }
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error (500") 
        }
    }



    static async updateItem(itemData:Item){
        try {
            const item = await itemModel.findOneAndUpdate({product: itemData.product}, {...itemData}, {new: true, runValidators: true}).exec()
            if(!item){
                throw new Error("Item cannot be found")
            }

            return item
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error (500") 
        }
    }


    static async deleteItem(itemData:Item){

       try {
         const item = await itemModel.findOneAndDelete({product: itemData.product}).exec()
         if(!item){
             throw new Error("Could not delete item")
         }
         
       } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Database Error (500") 

       }
    }


}


class OrderService{
    
    static async createOrder(orderData:ODetailsInterface){

        try {
            const order = new orderModel({
                id: cuid(),
                user: orderData.user,
                items: orderData.items,
                orderStatus: orderData.orderStatus,
                paymentDetails: orderData.paymentDetails,

                
            })
            if(!order){
                throw new Error("Failed to create order")
            }

            await order.save()
            return _.pick(order, ["id", "user", "items", "orderStatus", "paymentDetials", "createAt"])
            
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error (500")
        }
    }


    static async retreiveOrder(id: string){

        try {
            const order = await orderModel.findOne({id}).exec()
            if(!order){
                throw new Error("Could not find order")
            }

            return order

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error (500")
        }
    }


    

}