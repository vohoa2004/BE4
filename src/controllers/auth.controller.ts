import { Request, Response } from "express";
import { Account } from "../entities/Account.entity";
import { AuthService } from "../services/auth.service";
import { AccountDTO } from "../dto/account.dto";

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    };
    async login(req: Request, res: Response) {
        try {
            const dto: AccountDTO = req.body;
            if (!dto.username || !dto.password) {
                return res.status(400).json({ message: "Username and password are required" });
            }
            const { accessToken } = await AuthService.loginWithUsernameAndPassword(dto);
            return res.status(200).json({ message: "Login successful", accessToken });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const account: Account = req["currentUser"];
            return res.status(200).json({ ...account, password: undefined });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
