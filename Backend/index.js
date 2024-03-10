const PORT = 9001
const URLDB = 'mongodb://localhost:27017' 

const express = require ('express')
const cors = require ('cors')
const mongoose = require ('mongoose')
const jwt = require ('jsonwebtoken')
const {secret} = require ('./config')
const User = require('./models/User')
const Product = require('./models/Product')

const app = express()

app.use(cors())
app.use(express.json())

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

app.post('/regisration', async (req, res) => {
   console.log(req.body)
   const {login, password, email} = req.body
   const user = new User ({login, password, email})
    await user.save()
   res.json ({
    message: 'Вы успешно зарегистрировались!'
   })
})

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

 app.get('/products', async (req, res) => {

  /*   const products = [
        { id: 1, header: "Товар 1", price: 120 },
        { id: 2, header: "Товар 2", price: 312 },
        { id: 3, header: "Товар 3", price: 4332 },
        { id: 4, header: "Товар 4", price: 5434 },
        { id: 5, header: "Товар 5", price: 234 },
        { id: 6, header: "Товар 6", price: 123 },
        { id: 7, header: "Товар 7", price: 1232 },
        { id: 8, header: "Товар 8", price: 564 },
        { id: 9, header: "Товар 5", price: 234 },
        { id: 10, header: "Товар 6", price: 123 },
        { id: 11, header: "Товар 7", price: 1232 },
        { id: 12, header: "Товар 8", price: 564 } 
      ] */
      const products = await Product.find()
      

    res.json ({
     data: products
    })
 })

const start = async () => {
    try {
        await mongoose.connect(URLDB)
        app.listen(PORT, () => console.log(`Сервер запущен на  ${PORT} порте`))
    } catch (e) {
        console.log(e)
    }  
}

start()