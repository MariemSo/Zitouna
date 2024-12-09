import {Request,Response} from "express";
import bcrypt from 'bcrypt';
import prisma from "../prisma/prisma";
import jwt from 'jsonwebtoken';


const register = async (req: Request, res: Response) => {
    const {userName,firstName, lastName, email, password, phoneNumber,address} = req.body;
    try{
        const userExists = await prisma.user.findUnique({where: {email}})
        if(userExists){
            res.status(401).json({ success: false, error:"User already exists"})
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const resolvedUserName = userName ?? `${firstName} ${lastName}`;
        const user = await prisma.user.create({
            data:{
                userName:resolvedUserName,
                firstName,
                lastName,
                email,
                password:hashedPassword,
                phoneNumber:phoneNumber||null,
                address:address||null},
        })
        res.status(201).send({
            success: true,
            message: 'User Registered Successfully' ,
            user: { id: user.id, email: user.email, userName: user.userName }
        });
    }catch(err){
        res.status(500).send({success: false, message: 'Internal server error.', err })    }
}

const login = async (req: Request, res: Response) => {
    const {email,password}= req.body
    if(!email || !password){
        res.status(401).json({success:false,error:"Email and password are required."})
        return;
    }
    try{
        const user = await prisma.user.findUnique({
            where:{email}
        });
        if(!user){
            res.status(404).json({success:false, message: 'User Not Found'});
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
            return;
        }

        //JWT Token
        const token = jwt.sign({
            id:user.id,
            email:user.email,
            role:user.role
            },
            process.env.JWT_SECRET as string,
            {expiresIn: '1d'}
            );

        res.status(200).json({
            success: true,
            message: 'User Login Successfully',
            token,
            user:{
                id: user.id,
                email: user.email,
                userName: user.userName,
                role:user.role
            },
        });
    }catch(err){
        console.error('Login error:', err);
        res.status(500).json({  success: false, message: 'Error in Creating The User', err });
    }
}

const getProfile = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
         res.status(400).json({ success: false, message: 'User ID not found in request.' });
        return;
    }

    try{
        const user = await prisma.user.findUnique(
            {where:{id:userId},
            select:{
                id:true,
                email:true,
                firstName:true,
                lastName:true,
                userName:true,
                address:true,
                phoneNumber:true,
                role:true
            },
        });

        if(!user){
             res.status(404).json({success:false, message: 'User Not Found'});
             return ;
        }

         res.status(200).json({success:true, user});
    }catch(err){
         res.status(401).json({ success:false, message: 'Error retrieving profile.',error: err });
    }
}

const updateProfile = async (req: Request, res: Response) => {
    const userId=req.user?.id;

    if(!userId){
        res.status(401).json({success:false, message: 'Unauthorized access.'});
        return;
    }

    const { firstName, lastName, userName, address, phoneNumber}= req.body;

    try{
        const updatedUser = await prisma.user.update({
            where:{id:userId},
            data: {
                firstName,
                lastName,
                userName,
                address,
                phoneNumber,
            },
            select:{
                id:true,
                email:true,
                firstName:true,
                lastName:true,
                userName:true,
                address:true,
                phoneNumber:true,
                role:true
            },
        });
         res.status(200).json({success: true, message: 'User Updated Successfully', user: updatedUser});
    }catch(err){
         res.status(500).json({ success: false, message: 'Error updating profile.', error: err });
    }
}

export default {register,login, getProfile ,updateProfile};