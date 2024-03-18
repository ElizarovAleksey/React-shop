import React, { useState } from 'react';
import Order from '../views/Order';

function OrderButton() {
  const [isOrderVisible, setIsOrderVisible] = useState(false);

  const toggleOrderVisibility = () => {
    setIsOrderVisible(!isOrderVisible);
  };

  return (
    <div>
      <button onClick={toggleOrderVisibility}>Оформить заказ</button>
      {isOrderVisible && <Order />}
    </div>
  );
}

export default OrderButton;