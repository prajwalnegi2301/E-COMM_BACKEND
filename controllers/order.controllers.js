import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.js';
import orderService from '../services/order.services.js';

export const createOrder = asyncErrorHandler(async(req,res)=>{
    const user = req.user;

    let createdOrder = await orderService.createOrder(user,req.body);
    return res.status(201).send(createdOrder);
})

export const findOrderById = asyncErrorHandler(async(req,res)=>{
    const user = req.user;

    let createdOrder = await orderService.findOrderById(req.params.id);
    return res.status(201).send(createdOrder);
})


export const orderHistory = asyncErrorHandler(async(req,res)=>{
    const user = req.user;

    let createdOrder = await orderService.usersOrderHistory(user._id);
    return res.status(201).send(createdOrder);
})