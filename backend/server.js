import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/admin.route.js";

const app = express()
connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send("API is working"))
app.use('/api/admin', adminRouter)

const PORT = process.env.PORT || 4100;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})

export default app;