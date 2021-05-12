import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { authRouter } from './routes/authRoutes';
import { appRoutes } from './routes/appRoutes';
import cors from 'cors';
import passport from 'passport';
import { } from "multer";
import { passportConfig } from './strategies/passport';
import multer from "multer";

import { apiErrorHandler } from './error/apiErrorHandler';
import { userRoutes } from './routes/userRoutes';
import { initDatabase } from './database/database';

dotenv.config();
initDatabase({
    user: process.env.DATABASE_USER as string,
    host: process.env.DATABASE_HOST as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string,
    port: 5432,
    ssl: true
})

const app = express();
const port = process.env.PORT || 4000;
const upload = multer();
app.use(cors())
app.use(morgan('tiny'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(upload.array("name"))

// app.use(session({ pauseStream: true}));
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use('/api/auth/', authRouter);
app.use('/api/app/', appRoutes);
app.use('/api/app/user', userRoutes);

//this should be among the last of the routes cuz of the next() function
app.use(apiErrorHandler)


// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
//in case that no endpoint matches the request
app.use("*", (req, res) => {
    res.status(404).send("Not found , unlucky");
})

app.listen(port, () => {
    console.log(`Server running on port: ${chalk.green(port)}`);
});
