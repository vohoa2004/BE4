import * as fs from "fs";
import { generateKeyPairSync } from 'crypto';
import { Env } from "./env";

export class EncryptModule {
    private static privateKey: Buffer;
    private static publicKey: Buffer;
    private static keysDir = Env.KEY_PAIR_FOLDER;
    private static privateKeyPath = `${EncryptModule.keysDir}/key`;
    private static publicKeyPath = `${EncryptModule.keysDir}/key.pub`;

    static initialize() {
        if (!fs.existsSync(EncryptModule.keysDir)) {
            fs.mkdirSync(EncryptModule.keysDir);
        }

        if (!fs.existsSync(EncryptModule.privateKeyPath) || !fs.existsSync(EncryptModule.publicKeyPath)) {
            EncryptModule.generateKeyPair();
        } else {
            EncryptModule.loadKeys();
        }
    }

    private static generateKeyPair() {
        const { publicKey, privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
        fs.writeFileSync(EncryptModule.privateKeyPath, privateKey.export({ format: "pem", type: "pkcs1" }));
        fs.writeFileSync(EncryptModule.publicKeyPath, publicKey.export({ format: "pem", type: "pkcs1" }));
        EncryptModule.loadKeys();
    }

    private static loadKeys() {
        EncryptModule.privateKey = fs.readFileSync(EncryptModule.privateKeyPath);
        EncryptModule.publicKey = fs.readFileSync(EncryptModule.publicKeyPath);
    }

    static getPrivateKey(): Buffer {
        if (!EncryptModule.privateKey) {
            throw new Error("Private key is not set");
        }
        return EncryptModule.privateKey;
    }

    static getPublicKey(): Buffer {
        if (!EncryptModule.publicKey) {
            throw new Error("Public key is not set");
        }
        return EncryptModule.publicKey;
    }
}

