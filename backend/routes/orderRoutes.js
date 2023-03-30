import {
    createOrder,
    orderInfo,
    orderList,
    updateOrder,
} from '../controllers/orderController';

const orderRoutes = (app) => {

    app.route('/order')
        .post(createOrder);
    
    app.route('/orders')
        .get(orderList);

    app.route('/order/:orderId')    
        .get(orderInfo)
        .put(updateOrder);

}

export default orderRoutes;