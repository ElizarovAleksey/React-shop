import React, { useState } from 'react';
import './Upload.css';

function Upload() {
    const [nameProduct, setNameProduct] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!nameProduct || !price || !image) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
    
        const formData = new FormData();
        formData.append('nameProduct', nameProduct);
        formData.append('price', price);
        formData.append('image', image);
    
        try {
            const response = await fetch('http://localhost:9001/products', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Ошибка при добавлении товара');
            }
            alert('Товар успешно добавлен');
            setNameProduct('');
            setPrice('');
            setImage(null);
        } catch (error) {
            console.error('Ошибка при добавлении товара:', error);
        }
    };
    
    return (
        <div className="Upload">
            <h2>Добавить товар</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название товара:</label>
                    <input type="text" value={nameProduct} onChange={(e) => setNameProduct(e.target.value)} />
                </div>
                <div>
                    <label>Цена:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label>Изображение:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
}

export default Upload;