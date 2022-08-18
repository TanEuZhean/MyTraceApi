import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./src/routes/auth";
import connectDb from "./utils/db";
import { authMiddleware } from "./src/middleware/auth";
import { IUser } from "./src/models/user";
import historyRoute from "./src/routes/history";
import cookieParser from "cookie-parser";
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript/47448486#47448486
declare global {
	namespace Express {
		interface Request {
			user?: {
				id: string;
				name: string;
				phone: string;
				ic: string;
			};
		}
	}
}

const app = express();
const PORT = process.env.PORT || "5000";

dotenv.config();

connectDb();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth", authRoute);
app.use(authMiddleware);
app.get("/me", (req, res) => {
	return res.send((req as unknown as { user: IUser }).user);
});
app.use("/history", historyRoute);

app.use((err: any, req: any, res: any, next: any) => {
	res.status(err.status || 500).send(err.message);
	next();
});

const server = app.listen(PORT, () => {
	console.log(`App listening in port ${PORT} 🚀`);
});

process.on("unhandledRejection", (error, promise) => {
	console.log(`Logged Error: ${error}`);
	server.close(() => process.exit(1));
});
