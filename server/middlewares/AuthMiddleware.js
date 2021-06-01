import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export const AuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            console.log("unauthorized");
            return res.status(400).send("Unauthorized");
        }
        const token = authHeader.split(" ")[1];
        const isCustomToken = token?.length < 500;

        let decodedData;

        if (token && isCustomToken) {
            decodedData = jwt.verify(token, process.env.DB_SECRET_KEY);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (e) {
        console.log(e);
    }
}