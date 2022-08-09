import createError from '../helpers/createError';
import User from '../models/user';
import {Request, Response} from 'express';

type controllerUser = {
    getAll: (req: Request, res: Response) => Promise<void | never>
    getById: (req: Request, res: Response) => Promise<void | never>
    addUser: (req: Request, res: Response) => Promise<void | never>
    updateById: (req: Request, res: Response) => Promise<void | never>
    deleteById: (req: Request, res: Response) => Promise<void | never>
}
let controllerUser: controllerUser = {
    getAll: async (req: Request, res: Response): Promise<void | never> => {
        let list = await User.find();
        res.json(list)
    },
    getById: async (req: Request, res: Response): Promise<void | never> => {
        const {id} = req.params;
        let result = await User.findById(id);
        if (!result) {
            throw createError(404);
        }
        res.json(result)
    },
    addUser: async (req: Request, res: Response): Promise<void | never> => {

        let newModel = new User(req.body);
        let result = await newModel.save();
        res.status(201).json(result)
    },
    updateById: async (req: Request, res: Response): Promise<void | never> => {
        const {id} = req.params;
        let result = await User.findOneAndUpdate({"_id": id}, req.body, {new: true});
        if (!result) {
            throw createError(404);
        }
        res.json(result)
    },
    deleteById: async (req: Request, res: Response): Promise<void | never> => {
        const {id} = req.params;
        let result = await User.findByIdAndRemove(id);
        if (!result) {
            throw createError(404);
        }

        res.json(result)

    }

};


export default controllerUser;