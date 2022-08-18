import User, { IUser } from "../models/user";
import bcrypt from "bcryptjs";
import { ErrorResponse } from "../../utils";
import jwt from "jsonwebtoken";

export const signUp = async (userData: IUser) => {
	const salt = await bcrypt.genSalt(10);
	userData.password = await bcrypt.hash(userData.password, salt);

	const user = new User(userData);
	await user.save();

	return user;
};

export const signIn = async (userData: Pick<IUser, "ic" | "password">) => {
	const user = await User.findOne({ ic: userData.ic });
	if (!user) {
		throw new ErrorResponse("Invalid Credentials", 401);
	}
	const isMatch = await bcrypt.compare(userData.password, user.password);
	if (!isMatch) {
		throw new ErrorResponse("Incorrect password", 401);
	}
	const { _id, ic, name, phone } = user;
	return jwt.sign(
		{ id: _id, ic, name, phone },
		process.env.TOKEN_SECRET as string
	);
};

export const updateUser = (id: string, userData: IUser) =>
	User.findByIdAndUpdate(id, userData);
