import mongoose, { Schema } from "mongoose";

export interface IHistory {
	locationName: string;
	locationTime: string;
	userId: mongoose.ObjectId;
}

const historySchema = new Schema<IHistory>({
	locationName: { type: String, required: true },
	locationTime: { type: String, required: true },
	userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const History = mongoose.model("History", historySchema);

export default History;
