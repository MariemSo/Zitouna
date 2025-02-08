import express from "express";
import { getAllCategories } from "../services/categoryService";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (error:any) {
        res.status(500).json({ message: "Failed to fetch categories", error: error.message });
    }
});

export default router;
