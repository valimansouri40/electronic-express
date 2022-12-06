const dotenv = require('dotenv'); 
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({path:'./config.env'});
const db = process.env.DATABASE.replace('<password>',process.env.PASSWORD)
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify: false
}).then(()=> console.log('connect to mongoose'))
.catch(()=>console.log('cant connect to mongoose!!'));

const port = process.env.PORT || 8000;

app.listen(port, ()=>console.log('app running on port = ' + port))
