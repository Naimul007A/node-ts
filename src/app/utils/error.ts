import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { ZodError } from "zod";

type HttpError = Error & {
    status?: number;
    isJoi?: boolean;
};

async function errorHandler(err: HttpError, _req: Request, res: Response, _next: NextFunction) {
    let statusCode = err.isJoi === true ? 422 : err.status || 500;
    let messages: string | object = err.message;
    if (err instanceof ZodError) {
        const formattedErrors = err.issues.reduce((errors: { [key: string]: string }, issue) => {
            errors[issue.path[0] as string] = issue.message;
            return errors;
        }, {});
        statusCode = 422;
        messages = formattedErrors;
    }
    res.status(statusCode).send({
        error: {
            status: statusCode,
            message: messages,
        },
    });
}
//Route Not found
async function notFound(req: Request, res: Response, next: NextFunction) {
    next(createHttpError.NotFound("This Route not Registered."));
}

export { errorHandler, notFound };
