import { asyncErrorHandler } from '../middlewares/asyncErrorHandler';
import reviewService from '../services/rating.services.js';

export const createRating = asyncErrorHandler(async(req,res)=>{
    const user = req.user;
    const review = await ratingService.createReview(req.body,user);
    return res.status(201).send(review);
}) 

export const getAllRatings = asyncErrorHandler(async(req,res)=>{
    const productId = req.params.productId;
    const user = req.user;

    const reviews = await ratingService.getAllRatings(productId);
    return res.status(201).send(reviews);
})