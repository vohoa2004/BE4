import { AccountService } from "./account.service";
import { AccountDTO } from "../dto/account.dto";
import { encrypt } from "../utils/encrypt";
import { JsonWebTokenError } from "jsonwebtoken";
import { Account } from "../entities/Account.entity";

class HttpException extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class AuthService {
    static async loginWithUsernameAndPassword(dto: AccountDTO) {
        const account = await AccountService.findByUsername(dto.username);
        // Verify password with RSA-SHA256
        if (!encrypt.verifySomething(dto.password, account.password)) {
            throw new HttpException("Incorrect password!", 401);
        }
        return { accessToken: encrypt.signJwt(account.id) };
    }

    static async verifyAccessToken(accessToken: string) {
        let account: Account = null;
        try {
            const accountId = encrypt.verifyJwt(accessToken);
            account = await AccountService.findById(accountId);
        } catch (err) {
            if (!(err == JsonWebTokenError || err == HttpException)) {
                console.log(err);
            }
        }
        return account;
    }
}
