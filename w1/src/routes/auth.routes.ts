import { AccountService } from './../services/account.service';
import * as express from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

const router = express.Router();
import { authentication } from "../middlewares/auth.middleware";

const accountService = new AccountService();
const authService = new AuthService(accountService);
const authController = new AuthController(authService);

router.get(
    "/profile",
    authentication,
    authController.getProfile
);

router.post("/login-with-username-and-password", authController.login);

export { router as authRouter };
