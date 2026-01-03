import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import hrRoutes from "./routes/hr.routes"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/hr", hrRoutes)

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err))

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
