const PORT = 9001
const URLDB = 'mongodb://localhost:27017' 

const express = require ('express')
const cors = require ('cors')
const multer = require('multer') 
const app = express()
const mongoose = require ('mongoose') 
const Product = require('./models/Product')
const routes = require('./routes')
const ordersRouter = require('./routes/orders');

app.use(express.json())
app.use(cors());

app.use('/', routes);
app.use('/api/orders', ordersRouter);

const productsRouter = require('./routes/products');

/* Добавление товара в базу данных */
app.use('/uploads', express.static('uploads')); // Для доступа к загруженным файлам изображений
app.use('/products', productsRouter);
/* Отравенка карточки товаров */
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ data: products });
    } catch (error) {
        console.error('Ошибка получения карточек товаров:', error);
        res.status(500).send('Ошибка получения карточек товаров');
    }
});

/* Подключение к БД */
const start = async () => {
    try {
        await mongoose.connect(URLDB)
        app.listen(PORT, () => console.log(`Сервер запущен на  ${PORT} порте`))
    } catch (e) {
        console.log(e)
    }  
}

start()