import { Request, Response, NextFunction} from "express"


export const validateRequest = (req: Request, res: Response, next:NextFunction) => {
    const body = req.body
   if(!body){
    return res.status(400).json({error: "All fields are required"})
   }
   next()
}