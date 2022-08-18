import { model, Schema } from "mongoose";

export interface IUser {
	name: string;
	ic: string;
	phone: string;
	password: string;
}

const userSchema = new Schema<IUser>({
	name: { type: String, required: true },
	ic: { type: String, required: true },
	phone: { type: String, required: true },
	password: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
