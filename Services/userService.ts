import mongoose from "mongoose";
import { createUser } from "../Controllers/userController";
import { User, userModel } from "../Models/userModel";
import bcrypt from "bcrypt"



// //Example Behaviour
// interface Props {
//     onLoad: (options?: User) => void
//     onLoadStart: () => void
// }
// //Attributes of the object
// interface FieldProps {
//     id: string
//     session: string[]
// }

// type FullProps = FieldProps & Props

type UserAuth = Partial<User>


//Create  = POST
//Read = GET
//Update = PUT
//Delete = DELETE
 
//C.R.U.D - Create, Read , Update, Delete

// OOP Methods
//Class Level Method

type UserDataInterface = Pick<UserAuth, "username" | "email" | "password" | "isStaffMember"| "role"> & {newUser?: string}




class UserService {

    static async getUserById(id: string ){
        try {
            const user = await userModel.findOne({id}).exec()
            if(!user) {
                throw new Error(`User ID ${id} is invalid`)
            }
            return user
            
        } catch (error) {
            
        }
        
    }




    static async createUser(userData:UserAuth){
        const hashedPassword = await bcrypt.hash(userData.password!, 10)
        const user = new userModel({...userData, password: hashedPassword})
        await user.save()
        return user
    }



    static async updateUser(userData:UserDataInterface){

        try {
        const user = await userModel.findOneAndUpdate({username: userData.username}, {username: userData.newUser}, {new: true, runValidators: true}).exec()
        if(!user){
            //Client Side Error
            throw new Error(`User  with the username: ${userData.username} not found`)
        }

        await user.save()
        return user
    } 
    catch(error){
        //Server Side Error 
        throw new Error(error instanceof Error ? error.message : "Database Error (500)")
    }
    } 


    static async deleteUser(userData:UserDataInterface){

        try {
            const user = userModel.findOneAndDelete({username: userData.username})
            if(!user){
                throw new Error("Unable to delete user")
            }
            return user
            
            
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Database Error (500")
            
        }
    }
}

export default UserService