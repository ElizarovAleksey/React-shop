// Product.js
import React from 'react';
import './Product.css';

function Product({ nameProduct, imageUrl, price, onAddToCart }) {
  return (
    <div className="Product">
      <img src={imageUrl} alt={nameProduct} />
      <h1>{nameProduct}</h1>
      <p>{`${price} руб`}</p>
      <button onClick={() => onAddToCart({ nameProduct, imageUrl, price })}>Добавить в корзину</button>
    </div>
  );
}

export default Product;