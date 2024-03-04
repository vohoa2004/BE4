import * as express from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";

const router = express.Router();
import { authentication } from "../middlewares/auth.middleware";

const authController = new AuthController(AuthService);

router.get(
    "/profile",
    authentication,
    authController.getProfile
);

router.post("/login-with-username-and-password", authController.login);

export { router as authRouter };
