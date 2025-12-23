import express, { Application, NextFunction, Request, Response } from "express";
import rateLimit from 'express-rate-limit';
import { errorHandler, notFound } from "@utils/error";
import { route as Routes } from "@routes/routes";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app: Application = express();
// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    handler: (_req, res) => {
        res
            .status(429)
            .json({ message: 'Too many requests, please try again later.' });
    },
});
app.use('/api', limiter);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
    res.send("Application is Running. ");
});
//route config v1
app.use("/api/v1", Routes);
//handel router error
app.use(notFound);
//error check and return
app.use(errorHandler);
const PORT = process.env.PORT || 3502;
app.listen(PORT, () => {
    console.log(`Application is running at port : http://localhost:${PORT} `);
});
