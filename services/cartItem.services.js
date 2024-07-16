import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.js';
import UserService from './user.services.js';
import ErrorHandler from '../middlewares/errorHandler.js';

asyncErrorHandler(async function updateCartItem(userId,cartItemId,cartItemData){
    const item = await findCartItemById(cartItemId);
    if (!item) {
        return next(new ErrorHandler("cart item not found",400));
    }
    const user = await UserService.findUserById(item.userId);
    if(!user){
        return next(new ErrorHandler("user not found",400));
    }
    if(user._id.toString()===userId.toString()){
        item.quantity = cartItemData.quantity;
        item.price = item.quantity*item.product.price;
        item.discountedPrice = item.quantity*item.product.discountedPrice;
        const updateCartItem = await item.save();
        return updateCartItem;
    }
    else{
        return next(new ErrorHandler("unauthorized access",401));
    }

});

asyncErrorHandler(async function removeCartItem(userId,cartItemId){
    const cartItem = await findCartItemById(cartItemId);
    const user = await UserService.findUserById(userId);

    if(user._id.toString()===cartItem.userId.toString()){
        await cartItem.findByIdAndDelete(cartItemId);
    }
    else{
        return next(new ErrorHandler("you cannot remove another user item"));
    }
   
})

asyncErrorHandler(async function findCartItemById(cartItemId){
    const cartItem = await findCartItemById(cartItemId);
    if(cartItem){
        return cartItem;
    }
    else{
        return next(new ErrorHandler("cart item not found",400));
    }

})