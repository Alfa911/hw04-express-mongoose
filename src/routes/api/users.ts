import express from "express";
import {ctrlWrapper} from '../../helpers/index'
import controllerUser from "../../controllers/user";
import {validateId, validateBody} from './../../middlewares/index';

const router = express.Router();
router.get('/', ctrlWrapper(controllerUser.getAll));
router.get('/:id', validateId, ctrlWrapper(controllerUser.getById));
router.post('/', validateBody, ctrlWrapper(controllerUser.addUser));
router.put('/:id', validateId, validateBody, ctrlWrapper(controllerUser.updateById));
router.delete('/:id', validateId, ctrlWrapper(controllerUser.deleteById));
export default router;