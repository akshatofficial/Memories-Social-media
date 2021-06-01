import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

import postRoutes from "./routers/Post.js";
import userRouter from './routers/User.js';

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", userRouter);

app.get("/", (req, res) => {
    res.send("App is running.");
})

const mongodbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;

const port = process.env.PORT || 5000;

mongoose
    .connect(mongodbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((data) => {
        app.listen(port, () => {
            console.log(`Server is Running at ${port}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });

mongoose.set("useFindAndModify", false);
