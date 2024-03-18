//basket.js
import React, { useContext, useState } from 'react';
import './Basket.css';
import { CartContext } from '../components/CartContext';
import Order from './Order';

function Basket() {
  const { cart, removeFromCart, cartItemCount } = useContext(CartContext);
  const [isOrderVisible, setIsOrderVisible] = useState(false);
  const [isOrderButtonVisible, setIsOrderButtonVisible] = useState(true);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const toggleOrderVisibility = () => {
    setIsOrderVisible(!isOrderVisible);
    setIsOrderButtonVisible(!isOrderButtonVisible);
  };

  return (
    <div className="Basket">
      <h1>Корзина ({cartItemCount})</h1>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <img src={item.imageUrl} alt={item.nameProduct} />
                <div>
                  {item.nameProduct}: {item.price} руб
                </div>
                <button onClick={() => removeFromCart(index)}>Удалить</button>
              </li>
            ))}
          </ul>
          <p className="BasketOrder-text">Общая стоимость: {calculateTotal()} руб</p>
          {isOrderButtonVisible ? (
            <button onClick={toggleOrderVisibility} className="BasketOrder-text">Оформить заказ</button>
          ) : (
            <button onClick={toggleOrderVisibility} className="BasketOrder-text">Отменить заказ</button>
          )}
          {isOrderVisible && <Order totalPrice={calculateTotal()} />}
        </>
      ) : (
        <p>Корзина пуста</p>
      )}
    </div>
  );
}

export default Basket;