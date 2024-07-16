import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:50,
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    level:{
        type:Number,
        required:true,
    },
}); 

const category = mongoose.model('Category',categorySchema);
export default category;