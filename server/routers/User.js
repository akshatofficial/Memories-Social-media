import express from 'express';
import {CheckEmailExist, ResetPassword, SignIn, SignUp, VerifyOtp} from "../controllers/User.js";

const router = express.Router();

router.route("/signIn").post(SignIn);
router.route("/signUp").post(SignUp);
router.route("/isUserExist").post(CheckEmailExist);
router.route("/isValidOtp").post(VerifyOtp);
router.route("/resetPassword").post(ResetPassword);

export default router;