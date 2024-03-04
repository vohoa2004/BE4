import { Request, Response } from "express";
import { AccountService } from "../services/account.service";

export class AccountController {
    static async signup(req: Request, res: Response) {
        const dto = req.body;
        try {
            const account = await AccountService.signup(dto.username, dto.password);
            return res.status(201).json({ message: "User created successfully", account });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}