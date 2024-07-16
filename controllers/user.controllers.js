import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.js'
import ErrorHandler from '../middlewares/errorHandler.js';
import UserService from '../services/user.service.js'

const getUserProfile = asyncErrorHandler(async(req,res)=>{
    const jwt =req.headers.authorization?.split(" ")[1];
    if(!jwt){
        return next(new ErrorHandler("token not found",400));
    }
    const user = await UserService.getUserProfileByToken(jwt);

    res.status(200)
    .json({message:"user profile",user})
})

const getAllUSers = asyncErrorHandler(async(req,res)=>{
    const users = await UserService.getAllUsers();
    res.status(200)
    .json({message:"all users",users})
})