import { Router } from "express";
import { createUser } from "../Controllers/userController";
import { errorHandler } from "../Middleware/errorHandler";
import { validateRequest } from "../Middleware/validateUserRequest";

const router = Router()

router.post("/register", createUser)
router.put("/update-user")
router.get("/userquery/:id")
export default router