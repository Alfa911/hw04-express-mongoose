import {createError} from '../helpers/index'
import User from '../models/user';
import {Request, Response, NextFunction} from "express";

interface ErrorStatus extends Error {
    status?: number,
    kind?: string,
    value?: string,
    path?: string,
}

const validateBody = (req: Request, res: Response, next: NextFunction): void => {
    let newUser = new User(req.body);
    let error = newUser.validateSync();
    if (error) {
        let message = "";
        for (let field in error.errors) {
            let errorField: ErrorStatus = error.errors[field];
            if (errorField.kind === 'required') {
                message += `missing required ${field} field` + " " +
                    "" ;

            } else {
                message += errorField.message + " " +
                    "";

            }
        }
        if (message) {
            return next(createError(400, message));
        }
    }
    next();
};
export default validateBody;