const express= require('express');
const path= require('path')
const bodyparser=require('body-parser')
const session= require('express-session')
const {v4:uuidv4}=require('uuid')
const router= require('./router')
const app= express();
require('dotenv')
const port= process.env.PORT||8000;
app.set('view engine','ejs')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

//load static assets

app.use('/static',express.static(path.join(__dirname,"public")))
app.use('/assets',express.static(path.join(__dirname,"public/assets")))
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router);
app.get('/',(req,res)=>{
    res.render('base',{tit:'Login System'})
})
app.listen(port,()=>{
    console.log(`server is Running on port ${port}`)
})