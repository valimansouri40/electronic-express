const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// const bodyParser = require('body-parser');
const {authRouter, videoRouter,
     categoryRouter, orderRouter} = require('./Routes/index'); 
const AppError = require('./Utils/appError');
const globalErrorHandler = require('./Controllers/errorControls');

const app = express();


app.use(express.static('Public/img'))

app.get("/", (req, res) => {
  try{

    res.status(200).send("aparat in Vercel");
  }catch (er){
    res.status(500).send("cant not send req");

  }
    
  });

  app.use(helmet());

  // Development logging
  // if (process.env.NODE_ENV === 'development') {
  //   app.use(morgan('dev'));
  // }
  
  // Limit requests from same API
  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });

  app.use('/api', limiter);

  app.use(mongoSanitize());


  app.use(xss())

app.use(express.urlencoded({extended:true, limit:'10mb'}))
app.use(express.json({limit:'10mb'}))
app.use(cors());



app.use((req, res , next)=>{
    
    console.log('middleware!!!');

    next();
});


app.use('/api/v1/video', videoRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/some', categoryRouter);
app.use('/api/v1/order', orderRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
  app.use(globalErrorHandler);

module.exports = app;