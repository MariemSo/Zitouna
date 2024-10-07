import express,{Request,Response} from "express";

const app = express();

app.get('/',  (req: Request, res:Response) =>{
    res.send('hello world');
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log('listening on port ' + process.env.PORT || 3000);
});
