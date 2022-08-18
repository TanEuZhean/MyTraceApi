import { JwtPayload } from "jsonwebtoken";
import { decodeToken } from "../../utils";

export const authMiddleware = (req: any, res: any, next: () => void) => {
	if (!req.cookies) {
		return res.status(401).json("Unauthenticated");
	}
	try {
		const payload = decodeToken(req.cookies["token"]);
		req.user = payload;
		next();
	} catch (err) {
		return res.status(500);
	}
};
