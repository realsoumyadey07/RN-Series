require("dotenv").config();
import express, { Request, Response } from "express";
import { connectDb } from "./db";
import userRouter from "./router/todo.router";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
connectDb();

app.use(express.json({limit: "50mb"}));
app.use(cookieParser());
app.use(cors({
     origin: process.env.ORIGIN
}))

app.use("/api/v1/", userRouter)

app.get("/test", (req: Request, res: Response)=> {
     res.send("Hello word!");
});

app.listen(port, ()=> {
     console.log(`Server is running on ${port}`);
})