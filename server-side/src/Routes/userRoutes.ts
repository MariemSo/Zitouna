import Router , {Request,Response} from "express";
const router = Router();

const hello =router.get("/", (req:Request, res:Response) => {
    res.send('hello world');
})

export default {hello};