const PORT = 9001;
require('dotenv').config();
const URLDB = process.env.MONGODB_SERVER_URL || 'mongodb://localhost:27017/test';
const express = require ('express');
const cors = require ('cors');
const multer = require('multer');
const app = express();
const mongoose = require ('mongoose');
const Product = require('./models/Product');
const routes = require('./routes');
const ordersRouter = require('./routes/orders');
const productsRouter = require('./routes/products');

app.use(express.json());
app.use(cors());

// Разрешить запросы с указанных источников (замените '*' на домен вашего фронтенда)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/', routes);
app.use('/api/orders', ordersRouter);
app.use('/api/uploads', express.static('uploads'));
app.use('/api/products', productsRouter);

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ data: products });
    } catch (error) {
        console.error('Ошибка получения карточек товаров:', error);
        res.status(500).send('Ошибка получения карточек товаров');
    }
});

const connectToDatabase = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Подключен к MongoDB');
    } catch (error) {
        console.error('Не удалось подключиться к MongoDB:', error);
    }
};

const start = async () => {
    await connectToDatabase(URLDB);
    app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`));
};

start();