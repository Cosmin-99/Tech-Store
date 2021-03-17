import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('tiny'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/test", (req, res) => {
    res.json({
        message: "Test Message",
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${chalk.green(port)}`);
});
