import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    cartItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CartItem',
        required:true,
    }],
    totalPrice:{
        type:Number,
        required:true,
        default:0,
    },
    totalItem:{
        type:Number,
        required:true,
        default:0,
    },
    totalDiscountedPrice:{
        type:Number,
        required:true,
        default:0,
    },
    discounte:{
        type:Number,
        required:true,
        default:0,
    },
});

const cart = mongoose.model('Cart',cartSchema);
export default cart;