import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

export const TypeValidation = (dtoClass: any) => {
    return function (req: Request, res: Response, next: NextFunction) {
        const output = plainToClass(dtoClass, req.body)
        validate(output, { skipMissingProperties: false, forbidUnknownValues: true }).then(errors => {
            // errors is an array of validation errors
            if (errors.length > 0) {
                // eslint-disable-next-line @typescript-eslint/no-array-constructor
                let errorTexts = Array()
                for (const errorItem of errors) {
                    errorTexts = errorTexts.concat(errorItem.constraints)
                }
                res.status(400).send(errorTexts)
                return
            } else {
                res.locals.input = output
                next()
            }
        })
    }
}