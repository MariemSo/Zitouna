import {Request,Response} from "express";
import {getUserProfile, loginUser, registerUser,updateUserProfile } from "../services/userService";
import {UpdateProfileInput} from "../types/userTypes";


const register = async (req: Request, res: Response) => {
    try{
        const userData  = req.body;
        const user = await registerUser(userData);
        res.status(201).send({
            success: true,
            message: 'User Registered Successfully' ,
            user,
        });
    }catch(err){
        res.status(500).send({success: false, message: 'Internal server error.', err })    }
}

const login = async (req: Request, res: Response) => {
    try{
        const loginData = req.body;
        const result = await loginUser(loginData);
        res.status(200).json({
            success: true,
            message: 'User Login Successfully',
           ...result
        });
    }catch(err){
        console.error('Login error:', err);
        res.status(500).json({  success: false, message: 'Error in Creating The User', err });
    }
}

const getProfile = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      res
        .status(400)
        .json({ success: false, message: "User ID not found in request." });
      return;
    }
    try{
        const user = await getUserProfile(userId);
         res.status(200).json({success:true, user});
    }catch(err){
         res.status(401).json({ success:false, message: 'Error retrieving profile.',error: err });
    }
}

const updateProfile = async (req: Request, res: Response) => {
    const userId=req.user?.id;
    const dataInput :UpdateProfileInput = req.body;

    if(!userId){
        res.status(401).json({success:false, message: 'Unauthorized access.'});
        return;
    }

    try{
        const updatedUser = await updateUserProfile (userId,dataInput)
         res.status(200).json({success: true, message: 'User Updated Successfully', user: updatedUser});
    }catch(err){
         res.status(500).json({ success: false, message: 'Error updating profile.', error: err });
    }
}

export default {register,login, getProfile ,updateProfile};