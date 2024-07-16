import { asyncErrorHandler } from '../middlewares/asyncErrorHandler.js';
import Address from '../models/address.models.js';
import CartService from '../services/cart.service.js';
import Order from '../models/order.models.js'

asyncErrorHandler(async function createOrder(user,shipAddress){
    let address;
    if(shipAddress._id){
        let existAddress = await Address.findById(shipAddress._id);
        address = existAddress;
    }
    else{
        address = new Address(shipAddress);
        address.user = user;
        await address.save();
        
        user.address.push(address);
        await user.save();
    }

    const cart = await CartService.findUserCart(user._id);
    const orderItem=[];

    for(const item of cart.cartItems){
        const orderItem = new orderItem({
            product:item.product,
            quantity:item.quantity,
            price:item.price,
            size:item.size,
            userId:item.userId,
            discountedPrice:item.discountedPrice,
        })

        const createdOrderItem = await orderItem.save();
        orderItem.push(createdOrderItem);

        const createdOrder = new Order({
            user,
            orderItem,
            shipAddress:address,
            totalPrice:cart.totalPrice,
            totalDiscountedPrice:cart.totalDiscountedPrice,
            discounte:cart.discounte,
            totalItem:cart.totalItem,
        });
        const savedOrder = await createOrder.save();
        return savedOrder;
    }   
})

asyncErrorHandler(async function placeOrder(orderId){
    const order = await findOrderById(orderId);
    order.orderStatus = "Placed";
    order.paymentDetails.status="Completed";

    return await order.save();

})

asyncErrorHandler(async function confirmedOrder(orderId){
    const order = await findOrderById(orderId);
    order.orderStatus = "Confirmed";
    
    return await order.save();
    
})

asyncErrorHandler(async function shipOrder(orderId){
    const order = await findOrderById(orderId);
    order.orderStatus = "Shipped";

    return await order.save();
    
})

asyncErrorHandler(async function delieverOrder(orderId){
    const order = await findOrderById(orderId);
    order.orderStatus = "Delievered";

    return await order.save();
    
})

asyncErrorHandler(async function cancelledOrder(orderId){
    const order = await findOrderById(orderId);
    order.orderStatus = "Cancelled";

    return await order.save();
    
})

asyncErrorHandler(async function findOrderById(orderId){
    const order = await Order.findById(orderId)
    .populate("user")
    .populate({path:"orderItems",populate:{path:"product"}})
    .populate("shippingAddress")

    return order
})

asyncErrorHandler(async function usersOrderHistory(userId){
    const orders = await Order.find({user:userId,orderStatus:"Placed"})
    .populate({path:"orderItems",populate:{path:"product"}}).lean()

    return orders;
})

asyncErrorHandler(async function getAllOrders(){
    return await Order.find()
    .populate({path:"orderItems",populate:{path:"product"}}).lean()
})

asyncErrorHandler(async function deleteOrder(orderId){
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
})

module.exports = {
    createOrder,
    placeOrder,
    confirmedOrder,
    shipOrder,
    delieverOrder,
    cancelledOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder,
}