import { Schema, model } from "mongoose";

const Role = new Schema({
    value: {type: String, default: "USER" }
})

export default model('Role', Role)