import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    discountedPrice:{
        type:Number,
    },
    discountPercent:{
        type:Number,
    },
    quantity:{
        type:Number,
        required:true,
    },
    brand:{
        type:String,
    },
    color:{
        type:String,
    },
    sizes:[{
        name:{type:String},
        quantity:{type:String},
    }],
    imageUrl:{
        type:String,
    },
    ratings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Rating',
        },
    ],
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review',
        },
    ],
    numRatings:{
        type:Number,
        default:0,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
},{
    timestamps:true,
});

const product = mongoose.model('Product',productSchema);
export default product;