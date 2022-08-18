import mongoose from "mongoose";

const connectDb = async () => {
	await mongoose.connect(process.env.MONGO_URI as string);
	console.log("Mongoose connected 🎉");
};

export default connectDb;
