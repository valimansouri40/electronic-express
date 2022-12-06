const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const {authRouter, videoRouter,
     categoryRouter, orderRouter} = require('./Routes/index'); 

const app = express();

app.use(express.urlencoded({extended:true, limit:'10mb'}))
app.use(express.json({limit:'10mb'}))
app.use(cors());

app.use(express.static('Public/img'))

app.use((req, res , next)=>{
    
    console.log('middleware!!!');

    next();
});


app.use('/api/v1/video', videoRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/some', categoryRouter);
app.use('/api/v1/order', orderRouter);

app.all('*',(req, res, next)=>{
    res.status(200).json({
        status: false,
        error: 'path error'
    })
    throw('error')
})

module.exports = app;