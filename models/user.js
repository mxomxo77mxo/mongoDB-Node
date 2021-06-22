import { Schema, model } from "mongoose";

const User = new Schema({
    username: {type: String, unique: true, required: true },
    email: {type: String, unique: true, required: true },
    password: {type: String, required: true },
    roles: [{type: String, ref: 'Role'}]
})
// selected false
//joi for validation 

export default model('User', User)