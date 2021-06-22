import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

import User from "../models/user";
import Role from "../models/role";

export const SECRET_KEY = 'ds@#*)(!$&)2';

const generateToken = (id, roles ) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, SECRET_KEY, {expiresIn: '2d'})
}

class authController {
    async registration(req, res) {
        try {
            const err = validationResult(req);
            if(!err.isEmpty()){
                return res.status(504).json({ message: 'registration error, try again', err })
            }

            const { username, password, email } = req.body;
            const validUsername = await User.findOne({username}).populate('Role');
            const validEmail = await User.findOne({email});

            if(validUsername || validEmail){
                return res.status(400).json({message: 'your username or password already is used'})
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, email, password: hashPassword, roles: [userRole.value]})

            await user.save()
            return res.json({message: 'user added'})

        } catch (e) {
            console.log(e.message)
            res.status(504).json(e.message)
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({username});

            if(!user){
                return res.status(400).json({message: 'user not found'})
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message: 'password error'})
            }

            const token = generateToken(user._id, user.roles)
            return res.json({token})

        } catch (e) {
            console.log(e.message)
            res.status(504).json(e.message)
        }
    }

    async getUsers(req, res) {
        try {
            // const userRole = new Role();
            // const adminRole = new Role({value : "ADMIN"})
            // await userRole.save();
            // await adminRole.save()
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message)
        }
    }
}



export default new authController()