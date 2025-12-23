import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import ServerService from "@/app/services/ServerService";

class ServerController {
    public async apiHealth(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await ServerService.getApiHealth();
            res.status(200).json({
                success: {
                    message: result.message,
                    data: result.data,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}
export default new ServerController();
