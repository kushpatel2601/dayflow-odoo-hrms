import express from "express"
import { registerHr , loginHr , profileHr} from "../controller/hr.controller"

const router = express.Router()

router.post("/register", registerHr)
router.post("/login", loginHr)
router.post("/profile", profileHr) 


export default router
