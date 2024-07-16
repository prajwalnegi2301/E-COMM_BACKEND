import User from '../models/user.models.js';
import asyncErrorHandler from '../middlewares/asyncErrorHandler.js';
import ErrorHandler from '../middlewares/errorHandler.js';
import bcrypt from 'bcryptjs'

export const createUser = asyncErrorHandler(async(userData)=>{
    const isUserExist = await User.findOne({email});

    if(isUserExist){
        return next(new ErrorHandler("User already exist", 400));
    }
    
    const hashedPassword = bcrypt.hashSync(password,10);

    const user = new User({
        firstName,lastName,email,password:hashedPassword
    });
});

export const findUserById = asyncErrorHandler(async(userId)=>{
    const user = await User.findById(userId).populate("address");
    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }
    return user;
})

export const findUserByEmail = asyncErrorHandler(async(userId)=>{
    const user = await User.findOne({email});
    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }
    return user;
})

export const getUserProfileByToken = asyncErrorHandler(async(token)=>{
    const userId = jwtProvider.getUserProfileByToken(token);
    const user = await findUserById(userId);
    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }
    return user;
})

export const getAllUsers = asyncErrorHandler(async()=>{
    const users = await User.find();
    return users;
})