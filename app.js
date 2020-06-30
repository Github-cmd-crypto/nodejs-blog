const express = require('express');
const path = require('path');
const router = require('./router.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.engine('html', require('express-art-template'));
app.use('/public', express.static(path.join(__dirname, './public/')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    //secret: 'keyboard cat'是指配置加密字符串，它会在原有的加密基础之上和这个字符串拼接起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'keyboard cat',
    resave: false,
    // saveUninitialized: true是指无论你是否使用Session,都会默认分配给你一把密钥
    saveUninitialized: true
}))

app.use(router);

// 配置一个处理404的中间件
app.use((req, res) => {
    res.render('404.html')
})

// 配置一个全局错误处理的中间件
app.use((err, req, res, next) => {
    res.status(500).json({
        err_code: 500,
        message: err.message
    })
})

app.listen(5000, () => {
    console.log('running...');
})