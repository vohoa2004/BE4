import { datasource } from "./data-source"
import * as express from "express";
import * as dotenv from "dotenv";
import { authRouter } from "./routes/auth.routes";
import { accountRouter } from "./routes/account.routes";
import { errorHandler } from "./middlewares/error.middleware";
import "reflect-metadata";
import * as cors from "cors"
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.use(errorHandler);
const { PORT = 3000 } = process.env;

app.use("/auth", authRouter);
app.use("/accounts", accountRouter);

datasource.initialize()
    .then(async () => {
        app.listen(PORT, () => {
            console.log("Server is running on http://localhost:" + PORT);
        });
        console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log(error));