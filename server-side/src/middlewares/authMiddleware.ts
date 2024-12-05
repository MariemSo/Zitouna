import { Request, Response,NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
        res.status(401).json({ success:false, error: 'Access denied. No token provided.' });
        return;
    }
    try {
        if(!process.env.JWT_SECRET){
            throw new Error('JWT_SECRET is not defined in the environment');
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                console.log(err);
                res.status(401).json({ success:false, message: 'Invalid Token',error: err });
                return;
            }
            req.user = decoded as {id:number};
            next()
        });
    }
    catch(error){
        res.status(401).json({ success:false, error: error });
        return;
    }
}