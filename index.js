import express from 'express'
import cors from 'cors'
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
// import fileUpload from 'express-fileupload';
import dotenv from 'dotenv'
import { errorMiddleware } from './middlewares/errorHandler.js';
import { dbConnection} from './database/dbConnection.js'
import authRouters from './routes/auth.routes.js';
import userRouters from './routes/user.routes.js';
import productRouters from './routes/product.routes.js';
import orderRouters from './routes/order.routes.js';
import adminProductRouter from './routes/adminProduct.routes.js';
import cartRouter from './routes/cart.routes.js';
import cartItemRouter from './routes/cartItem.routes.js';
import adminOrderRouter from './routes/';
import reviewRouter from './routes/review.routes.js';
import ratingRouter from './routes/rating.routes.js';


const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
dotenv.config();
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true,
}))

app.use(cookieParser());


// app.use(fileUpload({
//     useTempFiles:true,
//     tempFileDir:"/tmp/",
// }))

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

app.get('/',(req,res)=>{
    return res.status(200).send({message:"Welcome to ecommerce api-node",status:true})
})

app.use('/api/v1/auth',authRouters);
app.use('/api/v1/user',userRouters);
app.use('/api/v1/products',productRouters);
app.use('/api/v1/admin/products',adminProductRouter);
app.use('/api/v1/cart',cartRouter);
app.use('/api/v1/cart_items',cartItemRouter);
app.use('/api/v1/orders',orderRouters);
app.use('/api/v1/admin/orders',adminOrderRouter);
app.use('/api/v1/reviews',reviewRouter);
app.use('/api/v1/ratings',ratingRouter);


dbConnection();

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log("server is running");
})

// Upload profile pic and documents on cloudinary