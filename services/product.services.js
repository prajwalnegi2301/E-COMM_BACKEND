import { asyncErrorHandler } from "../middlewares/asyncErrorHandler.js";
import Category from "../models/category.model.js";
import Product from '../models/product.model.js';
import { findUserById } from "./user.services.js";
import ErrorHandler from "../middlewares/errorHandler.js";


asyncErrorHandler(async function createProduct(reqData) {
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    });
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });

  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCategory,
      level: 2,
      parentCategory: topLevel._id,
    });
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });

  if (!thirdLevel) {
    thirdLevel = new Category({
        name: reqData.thirdLevelCategory,
        level: 3,
        parentCategory: secondLevel._id,
    });
  }

  const product = new Product({
    title:reqData.title,
    description:reqData.description,
    color:reqData.color,
    discountedPrice:reqData.discountedPrice,
    discountPercent:reqData.discountPercent,
    imageUrl:reqData.imageUrl,
    brand:reqData.brand,
    price:reqData.price,
    category:thirdLevel._id,
    sizes:reqData.size,
    quantity:reqData.quantity
  })
  return await product.save();
});



asyncErrorHandler(async function deleteProduct(productId){
    const product = await findUserById(productId);

    await Product.findByIdAndDelete(productId);
    return "Product deleted successfully";
})



asyncErrorHandler(async function updateProduct(productId,reqData){
   return await Product.findByIdAndUpdate(productId,reqData);
})



asyncErrorHandler(async function findProductById(id){
    const product = await Product.findById(id).populate("category").exec();

    if(!product){
        return next(new ErrorHandler("Product not found",400));
    }
    return product;
})



asyncErrorHandler(async function getAllProducts(reqQuery){
    let{category,color,sizes,minPrice,maxPrice,minDiscount,sor,stock,pageNumber,pageSize} = reqQuery;

    pageSize = pageSize || 10;

    let query = Product.find().populate("category");

    if(category){
        const existCategory = await Category.findOne({name:category});
        if(existCategory){
            query=query.where("category").equals(existCategory._id);
        }
        else{
            return {content:[],currentPage:1,totalPages:0}
        }
    }

    if(color){
        const colorSet = new Set(color.split(",").map(color=>color.trim().toLowerCase()));

        const colorRegex = colorSet.size>0?new RegExp([...colorSet].join("|"),i):null;

        query = query.where("color").regex(colorRegex);
    }

    if(minPrice && maxPrice){
      query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);

    }

    if(minDiscount){
      query = query.where("discountPercent").gt(minDiscount);
    }
    if(stock){
      if(stock==="in_stock"){
        query = query.where("quantity").gt(0);
      }
      else if(stock==="out_of_stock"){
        query = query.where("quantity").gt(1);
      }
    }
    if(sort){
      const sortDirection = sort ==="price_high"?-1:1;
      query=query.sort({discountedPrice:sortDirection})
    }

    const totalProducts = await Product.countDocuments(query);
    const skip = (pageNumber-1)*pageSize;
    query=query.skip(skip).limit(pageSize);
    const products = await query.exec();

    const totalPages = Math.ceil(totalProducts/pageSize);
    return {content:products,currentPage:pageNumber,totalPages};

})

asyncErrorHandler(async function createMultipleProduct(products){
  for(let product in products){
    await createProduct(product);
  }
})

module.exports={
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProduct
}

