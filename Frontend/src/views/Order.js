//Order.js
import React, { useContext, useState } from 'react';
import './Order.css';
import { CartContext } from '../components/CartContext';
import { placeOrder } from '../components/api-order';

function Order({ totalPrice }) {
  const { cart, clearCart } = useContext(CartContext);
  const [buyerName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        buyerName,
        email,
        address,
        phone,
        items: cart,
        totalPrice: totalPrice
      };
      console.log('Total price:', cart, totalPrice);
      await placeOrder(orderData);
      clearCart();

      setMessage('Ваш заказ успешно оформлен!');
      setName('');
      setEmail('');
      setAddress('');
      setPhone('');
    } catch (error) {
      console.error('Error placing order:', error);
      setMessage(error.message);
    }
  };

  return (
    <div className="Order">
      <h2>Оформление заказа</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Имя" value={buyerName} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Адрес доставки" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <input type="tel" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <button type="submit">Оформить заказ</button>
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
}

export default Order;