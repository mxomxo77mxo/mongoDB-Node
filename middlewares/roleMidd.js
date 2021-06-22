import jwt from "jsonwebtoken";

import {SECRET_KEY} from "../controlers/auth";

export default function(roles) {
    return function (req, res, next){
        if(req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(" ")[1]
            if(!token){
                return res.status(403).json({message: 'user error'})
            }

            const {roles: userRoles } = jwt.verify(token, SECRET_KEY)
            let checkRole = false
            userRoles.forEach(role => {
                if(roles.includes(role)){
                    checkRole = true
                }
            })
            if(!checkRole) {
                return res.status(403).json({message: 'you can\'t see this information '})
            }

            next()
        } catch (e) {
            console.log(e.message)
            return res.status(403).json({message: 'please log in'})
        }
    }
}