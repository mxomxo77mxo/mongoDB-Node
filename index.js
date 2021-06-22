import express from 'express';
import mongoose from 'mongoose';

import auth from "./routs/auth";

// const { CONNECTION_URL, PORT } = process.env;

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = `mongodb+srv://mxomxo77mxo:XHh17AXNxtHtgz3u@cluster0.uy4ek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express()

app.use(express.json());

app.use('/auth', auth);

mongoose.connect(CONNECTION_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
    .then(() => app.listen(PORT, () => console.log(`Server start on port: ${PORT}`)))
    .catch((e) => console.log(`${e} Did not connect`))

