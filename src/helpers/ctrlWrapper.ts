import {NextFunction, Request, Response} from "express";

const ctrlWrapper = (ctrl: (req: Request, res: Response) => Promise<void>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await ctrl(req, res);
        } catch (e) {
            next(e);
        }
    };
};
export default ctrlWrapper;