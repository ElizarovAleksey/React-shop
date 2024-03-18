const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST запрос для создания нового заказа
router.post('/', async (req, res) => {
  try {
    console.log('Received POST request at /api/orders:', req.body);
    const { buyerName, email, address, phone, totalPrice, items   } = req.body; // Предполагаемая структура заказа
    // Создание нового заказа в базе данных
    const order = new Order({
      buyerName,
      email,
      address,
      phone,
      totalPrice,
      items
      
    });

    // Сохранение заказа в базе данных
    await order.save();
    console.log('Order created successfully:', order);
    // Возвращаем успешный ответ клиенту
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    // В случае ошибки возвращаем код ошибки и сообщение об ошибке
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

module.exports = router;