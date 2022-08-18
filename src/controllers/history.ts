import History, { IHistory } from "../models/history";

export const getHistories = async (userId: string) => {
	return await History.find({ userId });
};

export const getHistory = async (id: string) => {
	return await History.findById(id);
};

export const createHistory = async (history: IHistory) => {
	return await History.create(history);
};
