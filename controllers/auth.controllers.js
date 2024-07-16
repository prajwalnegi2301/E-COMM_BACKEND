import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.js';
import ErrorHandler from '../middlewares/errorHandler.js';
import UserService from '../services/user.service.js';
import jwtProvider from '../utils/jwtProvider.js'
import bcrypt from 'bcryptjs'
import CartService from '../services/cart.service.js'

const register = asyncErrorHandler(async(req,res)=>{
    const user = await UserService.createUser(req.body);
    const jwt = jwtProvider.generateToken(user._id);

    await CartService.createCart(user);

    res.status(200)
    .json({message:"register success",jwt});
})

const login = asyncErrorHandler(async(req,res)=>{
    const{password,email}=req.body;
    const user = await UserService.getUserByEmail(email);
    if(!user){
        return next(new ErrorHandler("user not found with the email",email))
    }
    const isPasswordValid = bcrypt.compareSync(password,user.password);
    if(!isPasswordValid){
        return next(new ErrorHandler("password is not valid",400));
    }

    const jwt = jwtProvider.generateToken(user._id);
    res.status(200)
    .json({message:"login success",jwt});
})