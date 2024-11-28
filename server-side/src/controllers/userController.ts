import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';


const prisma = new PrismaClient()

const register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {userName,firstName, lastName, email, password, phoneNumber,address} = req.body;
    try{
        const userExists = await prisma.user.findUnique({where: {email}})
        if(userExists){
            res.status(401).json({error:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({data:{userName,firstName,lastName,email,password:hashedPassword,phoneNumber,address}})
        res.status(201).send({ message: 'User Registered Successfully' });
    }catch(err){
        res.status(500).send({ message: 'Error in Creating The User', err })    }
}