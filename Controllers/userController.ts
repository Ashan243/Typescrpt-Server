import {Request, Response, NextFunction} from "express"
import UserService from "../Services/userService"
import {userModel} from "../Models/userModel"



///Controllers handle HTTP requests only
export const createUser = async(req: Request, res: Response, next: NextFunction ) => {
     
    try {
        const user = await UserService.createUser(req.body)
        res.status(201).json({success: true, data: {
            username: user.username, //is the username the user added to be created be added to the database
            
        }})
    } catch (error) {
        next(error)
    }
}
//URI - Unique Resource ID ---> URLs = Unique Resource Links, URNs = Unique Resource Numbers. IBAN number 


export const getUserById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUserById(req.params.id as string)
        res.status(200).json({success: true, data: {...user}})
        console.log(user)
    } catch(error){
        next(error)
    }
}


export const updateUser = async(req: Request, res: Response, next: NextFunction) => {

    try {
        const user = await UserService.updateUser(req.body)
        res.status(200).json({success: true, message: "Username updated",data: {
            newUsername: user.username
        }})
        
        
    } catch (error) {
        next(error)
    }
    
}


export const deleteUser = async(req: Request,  res: Response, next: NextFunction) =>{

    
        
      try {
          const user = await UserService.deleteUser(req.body)
          res.status(200).json({success: true, data: {...user}, message: "User successfully deleted", timestamp: Date.now()
          })
  
      } catch (error) {
        next(error)
      }
    }