import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express's Request type to carry userId
// This is a TS technique called "declaration merging"
declare global {
	namespace Express {
		interface Request {
			userId?: string
		}
	}
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader?.startsWith('Bearer ')) {
		res.status(401).json({ error: 'No token provided '});
		return;
	}

	const token = authHeader.split(' ')[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
		req.userId = payload.userId;
		next(); // ← passes control to the next handler
	} catch {
		res.status(401).json({ error: 'Invalid or expired token' });
	}
}
