import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.js';
import productService from '../services/product.services.js';

export const createProduct=asyncErrorHandler(async(req,res)=>{
    const product = await productService.createProduct(req.body);
    return res.status(201).send(product);
})

export const deleteProduct=asyncErrorHandler(async(req,res)=>{
    const productId=req.params.id;
    const product = await productService.deleteProduct(productId);
    return res.status(201).send(product);
})


export const updateProduct=asyncErrorHandler(async(req,res)=>{
    const productId=req.params.id;
    const product = await productService.updateProduct(productId,req.body);
    return res.status(201).send(product);
})

export const findProductById=asyncErrorHandler(async(req,res)=>{
    const productId=req.params.id;
    const product = await productService.findProductById(productId);
    return res.status(201).send(product);
})

export const getAllProducts=asyncErrorHandler(async(req,res)=>{
    const productId=req.params.id;
    const products = await productService.getAllProducts(req.query);
    return res.status(201).send(products);
})

export const createMultipleProduct=asyncErrorHandler(async(req,res)=>{
    const productId=req.params.id;
    const product = await productService.createMultipleProduct(req.body);
    return res.status(201).send({message:"Products created successfully"});
})