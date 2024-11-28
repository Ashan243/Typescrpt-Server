import { Request, Response, NextFunction} from "express"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(500).json({success: false, message: "Server Error"})
}