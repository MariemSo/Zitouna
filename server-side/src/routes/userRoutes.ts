import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
    res.json({ message: "User endpoint works!" });
})

userRoutes.post("/register")
userRoutes.post('/login')
userRoutes.get('/profile')

export default userRoutes;