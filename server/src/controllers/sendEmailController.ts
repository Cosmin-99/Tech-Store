import {Request, Response} from "express";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const sendEmail = async(req: Request, res: Response) => {
    try {
    const { email } = req.body;

    //create reusable transporter object using the default SMPT transport
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    //send email with defined transport object
    const info: Promise<Mail>  = await transporter.sendMail({
        from: '"Tech Store support team" <support@techstore.com>',
        to: email,
        subject: "Reset Password",
        text: "Hello there !!!",
        html: "<p>Hello there !!!</p>"
    })

    return res.status(200).json({
        message: "Email Sent!"
    })

    } catch(err) {
        return res.status(400).json(err)
    }
}