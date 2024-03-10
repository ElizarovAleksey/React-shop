import React, {useState, useEffect}  from 'react';
import './Main.css';
import Product from '../components/Product';
import image from '../images/product.png'

function Main() {

  const [products, setProducts] = useState([]) 
  useEffect(() => {
    const api = 'http://localhost:9001/products'
    fetch(api) 
    .then(result => result.json())
    .then((result) => {
        console.log(result)
        setProducts(result.data)
    })
  }, []) 

  return (
    <div className="Main">
      {Array.isArray(products) ? 
  products.map((item) => <Product key={item.id} header={item.header} image={item.image} price={item.price}/>
  ) 
  : 
  <p>Данные о продуктах недоступны.</p>
}
    </div>
  );

}

export default Main;