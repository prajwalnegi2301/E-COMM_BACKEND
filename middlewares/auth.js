import { asyncErrorHandler } from "./asyncErrorHandler.js";
import jwtProvider from '../utils/jwtProvider.js'
import  UserService from '../services/user.services.js'

export const authenticate = asyncErrorHandler(async(req,res,next)=>{
    const token = req.headres.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    const userId = jwtProvider.getUserIdFromToken(token);
    const user = UserService.findUserById(userId);
    req.user = user;

    next();


})