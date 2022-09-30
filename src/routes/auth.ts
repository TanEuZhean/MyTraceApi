import express, { Request } from "express";
import { signIn, signUp } from "../controllers/auth";
import { IUser } from "../models/user";
const router = express.Router();

router.post(
	"/signin",
	async (req: Request<unknown, unknown, IUser>, res, next) => {
		try {
			const { ic, password } = req.body;
			const token = await signIn({ ic, password });
			// 1 hr expire
			res.cookie("token", token, { httpOnly: true, maxAge: 12960000 });
			return res.send({"msg" : "Success"});
		} catch (err) {
			next(err);
		}
	}
);

router.post(
	"/signup",
	async (req: Request<unknown, unknown, IUser>, res, next) => {
		try {
			console.log(req);

			const { ic, name, password, phone } = req.body;
			await signUp({ ic, name, password, phone });
			return res.send({"msg" : "Success"});
		} catch (err) {
			next(err);
		}
	}
);

export default router;
