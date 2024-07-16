import mongoose from "mongoose";


const ratingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    },
    rating:{
        type:Number,
        required:true,
    }
},{
    timestamps:true
});

const rating = mongoose.model('Rating',ratingSchema);
export default rating;