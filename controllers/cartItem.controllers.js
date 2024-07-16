import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.js';
import cartItemService from '../services/cartItem.services.js';

export const updateCartItem = asyncErrorHandler(async(req,res)=>{
    const user = req.user;
    const updatedCartItem = await cartItemService.updateCartItem(user._id,req.params.id,req.body);
    return res.status(200).send(updatedCartItem);
})

export const removeCartItem = asyncErrorHandler(async(req,res)=>{
    const user = req.user;
    await cartItemService.removeCartItem(user._id,req.params.id);
    return res.status(200).send({message:"cart item removed successfully"});
})