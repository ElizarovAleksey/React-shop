const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');

// Мультипарсер для загрузки файлов

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Сохраняем файл с его оригинальным именем и расширением
    }
});

const upload = multer({ storage: storage });

// Маршрут для загрузки товаров с изображением
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { nameProduct, price } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Используйте req.file.filename для получения имени файла

        if (!nameProduct || !price || !imageUrl) {
            return res.status(400).json({ message: 'Пожалуйста, заполните все поля' });
        }

        const newProduct = new Product({
            nameProduct,
            price,
            imageUrl
        });

        await newProduct.save();
        res.status(201).json({ success: true, message: 'Товар успешно добавлен', product: newProduct });
    } catch (error) {
        console.error('Ошибка при добавлении товара:', error);
        res.status(500).json({ success: false, message: 'Ошибка при добавлении товара' });
    }
});

module.exports = router;