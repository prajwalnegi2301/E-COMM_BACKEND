import { asyncErrorHandler } from '../middlewares/asyncErrorHandler';
import reviewService from '../services/';

export const createReview = asyncErrorHandler(async(req,res)=>{
    const user = req.user;
    const review = await reviewService.createReview(req.body,user);
    return res.status(201).send(review);
}) 

export const getAllReview = asyncErrorHandler(async(req,res)=>{
    const productId = req.params.productId;
    const user = req.user;

    const reviews = await reviewService.getAllReview(productId);
    return res.status(201).send(reviews);
})