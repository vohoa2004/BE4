import jwt = require("jsonwebtoken");
import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export async function authentication(authService: AuthService) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            // Extract access token from Authorization header
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
            }
            const accessToken = authorizationHeader.split(" ")[1];

            // Verify access token bằng authService
            const account = await AuthService.verifyAccessToken(accessToken);
            if (!account) return res.status(401).json({ message: "Unauthorized: Invalid token" });

            req["currentUser"] = account;
            next();

        } catch (error) {
            console.error("Error verifying access token:", error);
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
    };
}
