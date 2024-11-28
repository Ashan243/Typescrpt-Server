const axios = require("axios")


function sum(a, b){
    if(a === 0 || b ===0) return 0
    return a + b
}


const BACKEND_URL = "http://localhost:3000/api/v1"


describe("User Authentication", () => {
    test("Sign up a user that has valid username and password can since in only once", async() =>{
        const response = await axios.post(`${BACKEND_URL}/signup`, {
            username: "johndoe",
            password: "12345678",
            type: "user"
        })
        expect(response.status).toBe(201) //New resource was created
        expect(response.data.token).toBeDefined()

        const updatedResponse = await axios.post(`${BACKEND_URL}/signin`, {
            username: "johndoe",
            password: "12345678",
            type: "user"
        })

        expect(updatedResponse.status).toBe(200)

        await axios.delete("${BACKEND_URL}/users/testdata/johndoe") //Clean up test data



        //Always write cleanup logic
        //Bloating the database 


    })

    test("Sign up a user fails that has invalid username or password", async() => {
        const response = await axios.post(`${BACKEND_URL}/signup`, {
            username: "",
            password: "12345678",
            type: "user"
        })

        expect(response.status).toBe(400)
        expect(response.data.token).toBeUndefined()
    })

    //sign in tests
})

//Protected Endpoints
describe("User Orders", () => {

    let userToken

    beforeAll(async () => {
        username =  "johndoe"
        password = "12345678"

    await axios.post(`${BACKEND_URL}/signup`, {
        username,
        password,
        type: "user"
    })
    
       const signInResponse = await axios.post(`${BACKEND_URL}/signin`, {
        username,
        password
       })
       userToken = signInResponse.data.token
    })

    test("Creating a order with valid details", async () => {
        const response = await axios.post(`${BACKEND_URL}/create/order`, {
            user: "Username",
            items: ["Jumper", "Protein Shake", "Headphones"],
            orderStatus: "PENDING",
            paymentDetails: "BankTransfer",
            status: "PENDING",
            
        }, {
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        })

        expect(response.status).toBe(201) //New order has been created
        expect(response.data.orderId).toBeDefined()
    })

})

describe("Practice", () => {

    let userToken
    let userId
    beforeAll(() => {
        console.log("Hello")
    })
    
    test('should return 0 if parameter inputs are 0', () => {
    
      
        const answer = sum(0,0)
        expect(answer).toBe(0)
     })
})