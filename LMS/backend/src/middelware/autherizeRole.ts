import { Request, Response, NextFunction } from "express";

export const authorizeRole = (allowedRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const user = (req as any).user;

        if (!user) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }

        if (allowedRole !== user.role) {
            return res.status(403).json({
                message: "You do not have permission to perform this action"
            });
        }

        next();
    };
};