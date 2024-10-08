import express from "express";
import userRoutes from "./Routes/userRoutes";
import  dotenv from "dotenv";

dotenv.config();

const app = express();

app.use('/', userRoutes.hello  )

app.listen(process.env.PORT || 3000, ()=> {
    console.log('listening on port ' + process.env.PORT || 3000);
});
