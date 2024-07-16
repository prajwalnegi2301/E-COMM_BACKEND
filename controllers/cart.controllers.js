import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.js';
import cartService from '../services/cart.services.js';

export const findUserCart = asyncErrorHandler(async(req,res)=>{
    const user = req.user;
    const cart = await cartService.findUserCart(user._id);
    return res.status(200).send(cart);
})

export const addItemToCart = asyncErrorHandler(async(req,res)=>{
    const user = req.user;
    const cartItem = await cartService.addCartItem(user.id,req.body);
    return res.status(200).send(cartItem);
})


