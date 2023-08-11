import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function typeValidationMiddleware(dtoClass: any) {
    return function (req: Request, res: Response, next: NextFunction) {
        const output = plainToClass(dtoClass, req.body);
        validate(output, { skipMissingProperties: false }).then(errors => {
            // errors is an array of validation errors
            if (errors.length > 0) {
                let errorTexts = Array();
                for (const errorItem of errors) {
                    errorTexts = errorTexts.concat(errorItem.constraints);
                }
                res.status(400).send(errorTexts);
                return;
            } else {
                res.locals.input = output;
                next();
            }
        });
    };
}