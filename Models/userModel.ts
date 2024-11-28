import mongoose, {Document} from "mongoose";
import jwt from "jsonwebtoken"




export interface User extends Document {
    id: string
    username: string
    email: string
    password: string
    isStaffMember: boolean
    role: string
}

// const myTuple: [...string[]] = []
// const myObj = {
//     id: "1",
//     name: "Michael",
//     password: "John"
// }
// type UserWithoutPassword = Omit<typeof myObj, "password">
// const newObj: UserWithoutPassword = {
//     id: "2",
//     name: "Michael"
    
// }

//UserSchema and Model is the shape of data in the database
//^ anchor
//s -spaces
//@ - there is no @ before the actually @
//+ - add one string section on the left to the current on the right
//. literal dot
//$ - all 
//? - Assertion Operator
//?! - Negative lookahead assertion

// RegExp("/^[^s@]+@[^s@]+.(?companyname$)[^s@]")

const validateUserEmail = (email: string): boolean => {
    const regEx = RegExp("/^[^s@]+@[^s@]+.(?techworld.com$)[^s@]")
    return regEx.test(email)

}

const userSchema = new mongoose.Schema<User>({

    id: {
        type: String,
        required: [true, "Enter your Id Here"],
    
    },
    username: {
        type: String,
        required: [true, "Enter your name"]
    },
    email: {
        type: String,
        required: [true, "Enter your email"],
        validate: {
            validator: validateUserEmail,
            message: "You must provide an email"
        }
    },
    password:{
        type: String,
        required: [true, "Enter your password"],
        include: false

    },
    isStaffMember:{
        type: Boolean,
        required: true,
        default: false,
    },
    role: {
        type: String, 
        enum: ["superadmin", "admin", "user", "guest"],
        default: "user"
    }
}, {virtuals: true, timestamps: true

})


userSchema.virtual("userDetails", {
    
})

//If a user has business/t
//All are pre functions happen within thre request processing pipeline but before the clientside receive a response
userSchema.pre("save", function(next){
    this.isStaffMember = validateUserEmail(this.email) //if email is staff member email, isStaffMember = true
})

userSchema.pre("save", function(next){

    if(this.role === "superadmin" || this.role === "admin")
        userSchema.path("password").options.include = true
})



//__v - Keeps a track how many times that objject of data has been changed
//get (getter) handles the deserialisation --> data to the user from the server
//set (setter) handle the serialisation --> data from the user to the server 
//The virtuals deal with deserialized data (viewing data on a web application)
userSchema.virtual("emailwithusername").get(function(){
    return `${this.email} : ${this.username}`
})

// setter virrual
userSchema.virtual("credinatials").set(function(credinatialsName) {
    const [username, password] = credinatialsName.split(" ")
    this.username = username
    this.password = password

})



userSchema.methods.createToken = function(){
    const token = jwt.sign({_id: this._id}, "privatekey")
    return token
}

export const userModel = mongoose.model<User>("User", userSchema)