import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from "../models/User.js";
import dotenv from 'dotenv';
import PostModel from "../models/Post.js";
import NodeMailer from 'nodemailer';

dotenv.config();

export const SignIn = async (req, res) => {

    const {email, password} = req.body;

    try {
        const existingUser = await UserModel.findOne({email});
        if (!existingUser) return res.status(404).json({message: "No user found!"});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credential!"});
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.DB_SECRET_KEY, {
            expiresIn: '6h'
        });
        res.status(200).json({result: existingUser, token});
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

export const SignUp = async (req, res) => {
    try {
        const {email, password, confirmPassword, firstName, lastName} = req.body;
        const user = await UserModel.findOne({email});
        if (user) return res.status(400).json({message: "User already exist!"});
        if (password !== confirmPassword) return res.status(400).json({message: "Passwords do not match!"});
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await UserModel.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});
        const token = await jwt.sign({email: result.email, id: result._id}, process.env.DB_SECRET_KEY);
        res.status(200).json({result, token});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const CheckEmailExist = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await UserModel.findOne({email});
        let isUserExist = !!user;

        if (isUserExist === true) {
            //generate OTP
            let otp = Math.random();
            otp = otp * 1000000;
            otp = Math.floor(otp);
            console.log(otp);

            //Configure nodemailer createTransport
            let transporter = NodeMailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                service: "Gmail",

                auth: {
                    user: "akshatofficial2019@gmail.com",
                    pass: "akshat123@Anuj",
                }
            });

            //Mail options for sending mail
            let mailOptions = {
                to: email,
                subject: "OTP for Password Reset",
                html: "<h3>OTP for password reset is <h3/>" + "<h1 style='font-weight: bold;'>" + otp + "</h1>"
            }

            //Finally sending mail
            await transporter.sendMail(mailOptions, async (err, info) => {
                if (err) {
                    return console.log(err);
                }
                const updatedUser = await UserModel.findByIdAndUpdate({_id: user._id}, {otp: otp}, {new: true});
                console.log(updatedUser);
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", NodeMailer.getTestMessageUrl(info));
            });
        }
        res.status(200).json(isUserExist);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const VerifyOtp = async (req, res) => {
    try {
        const {otp, email} = req.body;

        console.log(otp, email);

        const user = await UserModel.findOne({email});
        console.log(user);

        const isValidOTP = (user.otp === otp);

        //console.log(isValidOTP);

        res.status(200).json(isValidOTP);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

export const ResetPassword = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(404).json({message: "No user exists with this email!"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const updatedUser = await UserModel.findByIdAndUpdate({_id: user._id}, {password: hashedPassword}, {new: true});
        res.status(200).json({updatedUser});
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}