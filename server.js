const dotenv = require('dotenv'); 
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({path:'./config.env'});
const db = process.env.DATABASE
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify: false
}).then(()=> console.log('connect to mongoose'))
.catch(()=>console.log('cant connect to mongoose!!'));

const port = process.env.PORT || 8000;

app.listen(port, ()=>console.log('app running on port = ' + port))
{/* <style>.h_iframe-aparat_embed_frame{position:relative;}.h_iframe-aparat_embed_frame .ratio{display:block;width:100%;height:auto;}.h_iframe-aparat_embed_frame iframe{position:absolute;top:0;left:0;width:100%;height:100%;}</style><div class="h_iframe-aparat_embed_frame"><span style="display: block;padding-top: 57%"></span><iframe src="https://www.aparat.com/video/video/embed/videohash/xIm5l/vt/frame"  allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe></div> */}