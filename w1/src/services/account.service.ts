import { datasource } from "../data-source";
import { Account } from "../entities/Account.entity";
import { encrypt } from "../utils/encrypt";

export class AccountService {
    static async signup(username: string, password: string) {
        const userRepository = datasource.getRepository(Account);
        const existingAccount = await userRepository.findOne({ where: { username: username } });
        if (existingAccount) {
            throw new Error("Username already exists");
        }

        // Tạo tài khoản mới nếu username chưa tồn tại
        const encryptedPassword = encrypt.signSomething(password);
        const account = new Account();
        account.username = username;
        account.password = encryptedPassword;
        await userRepository.save(account);

        return account;
    }

    async findByUsername(username: string) {
        const accountRepository = datasource.getRepository(Account);
        const account = await accountRepository.findOne({ where: { username: username } });
        if (!account) {
            throw new Error("Account not found");
        }
        return account;
    }

    async findById(accountId: string) {
        const accountRepository = datasource.getRepository(Account);
        const account = await accountRepository.findOne({ where: { id: accountId } });
        if (!account) {
            throw new Error("Account not found");
        }
        return account;
    }
}
