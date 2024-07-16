import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.js'
import Cart from '../models/cart.model.js'
import CartItem from '../models/cartItem.models.js'
import Product from '../models/product.model.js'



asyncErrorHandler(async function createCart(user){
    const cart = new Cart({user});
    const createdCart = await cart.save();
    return createdCart;
})


asyncErrorHandler(async function findUserCart(userId){
    let cart = await Cart.findOne({user});

    let cartItems = await CartItem.find({cart:cart._id}).populate("product");

    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for(let cartItem of cart.cartItems){
        totalPrice += cartItem.price;
        totalDiscountedPrice += cartItem.discountedPrice;
        totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalPrice;
    cart.discounte = totalPrice - totalDiscountedPrice;

    return cart;
});


asyncErrorHandler(async function addCartItem(userId,req){
    const cart = await Cart.findOne({user:userId});
    const product = await Product.findById(req.productId);

    const isPresent = await CartItem.findOne({cart:cart._id,product:product._id,userId})

    let cartItem;
    
    if(!isPresent){
        cartItem = new CartItem({
            cart:cart._id,
            product:product._id,
            quantity:1,
            price:product.price,
            discountedPrice:product.discountedPrice,
            size:req.size,
            userId,
            });
    }
    const createdCartItem = await cartItem.save();
    cart.cartItems.push(createdCartItem);
    await cart.save();
    return "Item added to cart";

})