import Rating from '../models/rating.model.js';
import ProductService from '../services/product.services.js';

async function createRating(req,user){
    const product = await ProductService.findProductById(req.productId);

    const rating = new Rating({
        product:product._id,
        user:user._id,
        rating:req.rating,
    })
    return await rating.save();
}

async function getProductRating(productId){
    return await Rating.find({product:productId});

}

module.exports={
    createRating,
    getProductRating
}