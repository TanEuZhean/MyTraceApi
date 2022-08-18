import jwt from "jsonwebtoken";
export class ErrorResponse extends Error {
	statusCode: number;
	constructor(message: any, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export const decodeToken = (token: string) =>
	jwt.verify(token, process.env.TOKEN_SECRET as string);
