import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
    }],
    orderData:{
        type:Date,
        required:true,
    },
    delivaryDate:{
        type:Date,
    },
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address',
    },
    paymentDetails:{
        paymentMethod:{
            type:String,
        },
        transactionId:{
            type:String,
        },
        paymentId:{
            type:String,
        },
        paymentStatus:{
            type:String,
            default:"Pending",
        }
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    totalDiscountedPrice:{
        type:Number,
        required:true,
    },
    discounte:{
        type:Number,
        required:true,
    },
    orderStatus:{
        type:String,
        required:true,
        default:"Pending",
    },
    totalItem:{
        type:Number,
        required:true,
    },
},{
    timestamps:true
});

const order = mongoose.model('Order',orderSchema);
export default order;