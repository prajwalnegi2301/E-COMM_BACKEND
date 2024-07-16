import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:true,
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
},{
    timestamps:true
});

const review = mongoose.model('Review',reviewSchema);
export default review;