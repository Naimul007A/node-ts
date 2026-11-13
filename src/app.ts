import express, { type Application, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import { errorHandler, notFound } from "@utils/error";
import { route as Routes } from "@routes/routes";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
const app: Application = express();

// 1. CORS MUST be the VERY FIRST middleware mounted!
// This guarantees that ANY response (including rate-limiting 429, parser errors, or 500s)
// will ALWAYS have CORS headers attached so the browser never misinterprets them as a "CORS error".
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    })
);

// 2. Logging & Request Parsers
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// 3. Rate limiting middleware (configured sensibly for SPA/frontend clients)
const rateLimitMax =
    process.env.NODE_ENV === "test" ? 10000 : Number(process.env.RATE_LIMIT_MAX) || 5000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: rateLimitMax, // Prevent accidental rate limiting in dev/SPA while preserving flood protection
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.method === "OPTIONS", // Never rate-limit CORS preflight requests
    handler: (_req, res) => {
        res.setHeader("Retry-After", "60");
        res.status(429).json({ message: "Too many requests, please try again later." });
    },
});

app.use("/api", limiter);
app.get("/", (req: Request, res: Response) => {
    res.send("Application is Running. ");
});
//route config v1
app.use("/api/v1", Routes);
//handel router error
app.use(notFound);
//error check and return
app.use(errorHandler);

export default app;
