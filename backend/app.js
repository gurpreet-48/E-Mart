const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv');
const path = require('path');

const errorMiddleware = require('./middlewares/errors')

//Setting up config file
dotenv.config({ path: 'backend/config/config.env' })

app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser())
app.use(fileUpload());



// import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');

if(process.env.NODE_ENV === 'PRODUCTION'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',payment)
app.use('/api/v1', order)

app.use(errorMiddleware);

module.exports = app
 