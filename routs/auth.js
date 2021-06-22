import express from 'express';
import  { check } from "express-validator";

import controller from '../controlers/auth';
import roleMidd from "../middlewares/roleMidd";

const router = express.Router();

router.post('/registration',[
    check('username', 'your username or password not valid').notEmpty().isLength({ min:6, max: 20}),
    check('password', 'your username or password not valid').notEmpty().isLength({ min:6, max: 20}),
    check('email', 'your email not valid').notEmpty().isEmail(),
], controller.registration);
router.post('/login', controller.login);
router.get('/users', roleMidd(['ADMIN']), controller.getUsers);

export default router;