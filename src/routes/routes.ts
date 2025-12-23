import express, { NextFunction, Router } from "express";
import ServerController from "@/app/controllers/ServerController";
const route: Router = express.Router();
//check api health
route.get("/health", ServerController.apiHealth);

export { route };
