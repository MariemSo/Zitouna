import {Request, Response, NextFunction} from "express";

export  const requireRole = (allowedRoles:string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;

        if(!userRole||!allowedRoles.includes(userRole)){
            res.status(403).json({
                success: false,
                message: "Forbidden: You do not have permission to access this resource.",
            })
            return
        }

        next();
    }
}