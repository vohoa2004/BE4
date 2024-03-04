import * as express from "express";
import { AccountController } from "../controllers/account.controller";
const Router = express.Router();

Router.post("/", AccountController.signup);

export { Router as accountRouter };