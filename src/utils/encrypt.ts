import * as jwt from "jsonwebtoken";
import { Env } from "./env";
import { EncryptModule } from "./encrypt.module";
import { createSign, createVerify } from "crypto";

export class encrypt {
    static initializeEncryptModule() {
        EncryptModule.initialize();
    }

    static signSomething(something: string) {
        this.initializeEncryptModule();
        const privateKey = EncryptModule.getPrivateKey();
        const sign = createSign("sha256");
        sign.update(something);
        return sign.sign(privateKey).toString("base64");
    }

    static verifySomething(something: string, signature: string) {
        this.initializeEncryptModule();
        const publicKey = EncryptModule.getPublicKey();
        if (!publicKey) {
            throw new Error("Public key is not set");
        }
        const verify = createVerify("sha256");
        verify.update(something);
        return verify.verify(publicKey, Buffer.from(signature, "base64"));
    }

    static signJwt(subject: string) {
        return jwt.sign({}, Env.JWT_SECRET, {
            subject: subject,
            issuer: Env.JWT_ISSUER,
            expiresIn: Env.JWT_EXPIRE
        });
    }

    static verifyJwt(token: string) {
        // sử dụng hàm verify chứ không làm bằng tay
        const subject = jwt.verify(token, Env.JWT_SECRET, {
            issuer: Env.JWT_ISSUER,
        }).sub;
        return typeof subject == "string" ? subject : "";
    }
}
