const PORT = 9001
const URLDB = 'mongodb://localhost:27017' 

const express = require ('express')
const cors = require ('cors')
const multer = require('multer')
const mongoose = require ('mongoose')
const jwt = require ('jsonwebtoken')
const {secret} = require ('./config')
const User = require('./models/User')
const Product = require('./models/Product')
/* const path = require('path');
const router = express.Router(); */
const app = express()
app.use(cors());

const productsRouter = require('./routes/products');

app.use(express.json())



/* Генерация токенов для авторизации пользователя */
const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

/* Регистрация пользователей */
app.post('/regisration', async (req, res) => {
   console.log(req.body)
   const {login, password, email} = req.body
   const user = new User ({login, password, email})
    await user.save()
   res.json ({
    message: 'Вы успешно зарегистрировались!'
   })
})
/* Авторизиция пользователей */
app.post('/login', async (req, res) => {
    console.log(req.body) 
    const {login, password} = req.body
    const user = await User.findOne({login})
    if (!user){
        return res.status(400).json({message: 'Пользователь не найден!'})
    }
    if (user.password !== password){
        return res.status(400).json({message: 'Не верный логин или пароль!'})
    }
    const token = generateAccessToken(user._id)
    res.json ({
     message: 'Вы успешно автризовались!',
     token: token
    })
 })

/* Добавление товара в базу данных */
app.use('/uploads', express.static('uploads')); // Для доступа к загруженным файлам изображений

app.use('/products', productsRouter);


/* // Создание хранилища для загруженных изображений
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, 'product-' + Date.now() + ext);
    },
  });
  
  // Фильтр для проверки типа загружаемого файла (изображение)
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Можно загружать только изображения'));
    }
  };
  
  // Настройка multer
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  });
  
  // Обработчик POST-запроса для загрузки изображения
  app.post('/products', upload.single('image'), async (req, res) => {
    try {
      const { nameProduct, price } = req.body;
      const imageUrl = req.file ? req.file.path : null;
  
      // Создание нового продукта с данными из запроса
      const newProduct = new Product({
        nameProduct,
        price,
        imageUrl,
      });
  
      // Сохранение продукта в базе данных
      await newProduct.save();
  
      // Отправка ответа об успешном добавлении продукта
      res.status(201).json({ message: 'Продукт успешно добавлен' });
    } catch (error) {
      // Обработка ошибок
      console.error('Ошибка при добавлении продукта:', error);
      res.status(500).json({ message: 'Ошибка при добавлении продукта' });
    }
  }); */

/* Отравленка карточки товаров */
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