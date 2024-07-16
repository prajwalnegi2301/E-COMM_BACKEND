import mongoose, { mongo } from 'mongoose';

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO,{
        dbName:"ECommerce",
    }).then(()=>{
        console.log("connected to database");
    }).catch((error)=>{
        console.log(`error: ${error}`);
    })
}