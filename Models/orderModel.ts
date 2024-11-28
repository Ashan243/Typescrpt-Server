import mongoose, {Document, ObjectId, model,  Schema} from "mongoose";
import {User, userModel} from "../Models/userModel"
import { IProduct } from "./productModel";
import cuid from "cuid";

export interface Item extends Document{

    product: IProduct["_id"]   //uniquely Idenify an order
    price: number //For indexing and keeping track order how many orders the company has
    quantity: number
}


enum OrderStatusOptions {
    PENDING = "Pending",
    PROCESSING = "Processing",
    SHIPPED = "Shipped",
    DELIVERED = "Delivered",
    CANCELLED  = "Cancelled"
}

enum PaymentMethod{
    PAYPAL = "PayPal",
    CreditCard = "Credit Card",
    BankTransfer = "Bank Transfer" 
}

enum PaymentStatus{
    PENDING = "Pending",
    PAID = "Paid",
    FAILED = "Failed"
}

interface IShippingDetials  {
    street: string,
    doorNumber: number,
    postcode: string,
    city: string,
    country: string,
    county: string
}

export interface IOrder extends Document{

    id: string
    user: Schema.Types.ObjectId
    items: Item[]
    orderStatus: OrderStatusOptions
    paymentDetails: {
        method: PaymentMethod
        status: PaymentStatus
    }
    shippingDetails: IShippingDetials,
    createdAt: Date
    updateAt: Date
    totalPrice: number //Virtual field for total price
    totalPriceWithVAT: number //virtual field for total price with vat

}




const itemSchema = new mongoose.Schema<Item>({
 
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    price:{

        type: Number,
        required: true
    },

    quantity:{
        
        type: Number,
        required: true,
        min: [1, "There must be at least 1 available"]
    }
})



 const orderSchema = new mongoose.Schema<IOrder>({
    id: {
        type: String,
        default: cuid(),
        required: true,
        unique: true
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items:{
        type: [itemSchema],
        validate:{
            validator: function(v){
                return v.length > 0
            },
            message: "Your Order must have at least one item"
        }
        },
        orderStatus: {
            type: String,
            enum: OrderStatusOptions,
            default: OrderStatusOptions.PENDING
        },
        paymentDetails: {
                method: {
                    type: String,
                    enum: PaymentMethod,
                    default: PaymentMethod.BankTransfer
                },
        status: {
            type: String,
            enum: PaymentStatus,
            default: PaymentStatus.PENDING
                }    
            },

        


    
},  {timestamps:true, toJSON: {virtuals: true}, toObject: {virtuals: true}})


orderSchema.pre("save", function(next){

})

orderSchema.virtual("totalPrice").get(function (){
    return this.items.reduce((total, item) => total + (item.quantity * item.price), 0)
})

orderSchema.pre("save", function(next){
    if(this.paymentDetails.status === PaymentStatus.PAID && this.orderStatus === OrderStatusOptions.PENDING){
        this.orderStatus = OrderStatusOptions.PROCESSING
    }
    next()
})

export const orderModel = mongoose.model<IOrder>("Orders", orderSchema)

export const itemModel = mongoose.model<Item>("Item", itemSchema)
