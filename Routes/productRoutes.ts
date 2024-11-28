import { Router } from "express";
import { addProduct, updateProduct, deleteProduct, getProduct } from "../Controllers/productController";



const router = Router()

router.post("/add-product", addProduct)
router.put("/update-product", updateProduct)
router.delete("delete-product", deleteProduct)
router.get("find-product", getProduct)

export default router