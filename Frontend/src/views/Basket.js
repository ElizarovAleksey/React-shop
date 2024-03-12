import React, { useContext } from 'react';
import './Basket.css';
import { CartContext } from '../components/CartContext';

function Basket() {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="Basket">
      <h1>Корзина</h1>
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
          <p>Общая стоимость: {calculateTotal()} руб</p>
        </>
      ) : (
        <p>Корзина пуста</p>
      )}
    </div>
  );
}

export default Basket;