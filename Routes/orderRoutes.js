const express = require('express');
const { Protected, ResterictTo } = require('../Controllers/UserControls');
const Order = require('../Controllers/orderControls');

const orderRouter = express.Router();


orderRouter.use(Protected);

orderRouter.route('/').get(ResterictTo('admin') ,Order.getAllOrder)
.post(Order.createOrder);

orderRouter.route('/:id').get(Protected,Order.getOneOrder)
.patch(ResterictTo('admin'),Order.updateOrder)
.delete(ResterictTo('admin'),Order.deleteOrder);

module.exports = orderRouter;

