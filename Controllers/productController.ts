import { Request, Response, NextFunction } from "express";
import ProductService from "../Services/productServices"


export const addProduct = async(req:Request, res:Response, next:NextFunction) =>{

    try {
        const product = await ProductService.addProduct(req.body)
        res.status(200).json({success: true, data: {...product}, message: "Product has been successfully added"})
    
    } catch (error) {
        next(error)
    }
}

export const getProduct = async(req:Request, res:Response, next:NextFunction) =>{
    const cuid = require("cuid")

   try {
     const product = await ProductService.getProduct(req.body)
     res.status(200).json({success: true, data: {...product}, message: "Product found"})
   
    } catch (error) {
        next(error)

   }
}

export const updateProduct = async(req:Request, res:Response, next:NextFunction) =>{

    try {
        const product = await ProductService.updateProduct(req.body)
        res.status(200).json({success: true, data: {...product}, message: "Product updated"})
        
    } catch (error) {
        next(error)
    }
}


export const deleteProduct = async(req:Request, res:Response, next:NextFunction) =>{
    
    try {
        
            const product = await ProductService.deleteProduct(req.body)
            res.status(200).json({status: true, data: product, message: "Product deleted"})
    } catch (error) {
        next(error)
    }
}

