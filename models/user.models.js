import mongoose from 'mongoose';
import validator from 'validator'

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"nName must be atleast 5 characters"],
    },
    lastName:{
        type:String,
    },
    password:{
        type:String,
        minLength:[8,"Password must be 8 characters"],
    },
    email:{
        type:String,
        validate:[validator.isEmail,"Enter a valid Email"],
        unique:true,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"Customer",
    },
    mobile:{
        type:String,
        minLength:[10,"Enter a valid mobile Number"],
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    }],
    payment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Payment_information",
        }
    ],
    ratings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Rating"
        }
    ],
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
},{
    timestamps:true
})

const user = mongoose.model('User',userSchema);
export default user;