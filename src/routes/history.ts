import express, { Request, Router } from "express";
import { IHistory } from "../models/history";
import {
	createHistory,
	getHistories,
	getHistory,
} from "../controllers/history";
import { IUser } from "../models/user";

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		if (req.user) {
			const histories = await getHistories(req.user.id);
			return res.status(200).json(histories);
		}
	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const history = await getHistory(req.params.id);
		return res.status(200).json(history);
	} catch (err) {
		next(err);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { locationName, locationTime, userId } = req.body as IHistory;
		const history = await createHistory({
			locationName,
			locationTime,
			userId,
		});
		return res.status(200).json(history);
	} catch (err) {
		next(err);
	}
});

export default router;
