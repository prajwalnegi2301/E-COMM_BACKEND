import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.js';
import orderService from '../services/order.services.js';

export const getAllOrders = asyncErrorHandler(async(req,res)=>{
    const orders = await orderService.getAllOrders();
    res.status(200).send(orders);
})

export const confirmedOrders = asyncErrorHandler(async(req,res)=>{
    const orderId = req.params.orderId;
    const orders = await orderService.confirmedOrder(orderId);
    return res.status(200).send(orders);
})

export const shipOrders = asyncErrorHandler(async(req,res)=>{
    const orderId = req.params.orderId;
    const orders = await orderService.shipOrder(orderId);
    return res.status(200).send(orders);
})

export const delieverOrders = asyncErrorHandler(async(req,res)=>{
    const orderId = req.params.orderId;
    const orders = await orderService.delieverOrder(orderId);
    return res.status(200).send(orders);
})

export const cancelledOrders = asyncErrorHandler(async(req,res)=>{
    const orderId = req.params.orderId;
    const orders = await orderService.cancelledOrder(orderId);
    return res.status(200).send(orders);
})



export const deleteOrders = asyncErrorHandler(async(req,res)=>{
    const orderId = req.params.orderId;
    const orders = await orderService.deleteOrder(orderId);
    return res.status(200).send(orders);
})








