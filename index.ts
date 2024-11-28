import express from "express"
import userRoutes from "./Routes/userRoutes"
import productRoutes from "./Routes/productRoutes"
import { errorHandler } from "./Middleware/errorHandler"
import dotenv from "dotenv"
import { ConnectDB } from "./Utils/db"

dotenv.config()


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use(errorHandler);

const PORT = process.env.PORT || 4002

ConnectDB(process.env.MONGO_URI ?? "mongodb://localhost:27017").then(() => app.listen(PORT, () => console.log(`Listening on port ${PORT}`))).catch(err => console.log(err))


