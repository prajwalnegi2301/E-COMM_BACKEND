import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    firstName:{
        required:true,
        type:String,
        minLength:[3,"Name must contain atleast 3 characters"],
    },
    lastName:{
        type:String,
    },
    streetAddress:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    zipCode:{
        type:Number,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    mobile:{
        type:String,
        required:true,
    }
});

const address = mongoose.model('Address',addressSchema);
export default address;
