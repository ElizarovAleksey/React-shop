// Main.js
import React, { useState, useEffect, useContext } from 'react';
import './Main.css';
import Product from '../components/Product';
import { CartContext } from '../components/CartContext';
import { productUrl } from '../components/endpoints';

function Main() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext); // Получаем функцию addToCart из контекста корзины

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${productUrl}/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log('Received products:', data);
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const getImageUrl = (imageUrl) => {
    return imageUrl ? `${productUrl}${imageUrl}` : null;
  };

  return (
    <div className="Main">
      {products.length > 0 ? (
        products.map((product) => (
          <Product
            key={product.id}
            nameProduct={product.nameProduct}
            imageUrl={getImageUrl(product.imageUrl)}
            price={product.price}
            onAddToCart={addToCart} // Передаем функцию добавления в корзину
          />
        ))
      ) : (
        <p>Данные о продуктах недоступны.</p>
      )}
    </div>
  );
}

export default Main;