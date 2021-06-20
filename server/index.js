const fs = require('fs');
const path = require('path');
const express = require('express');
const api = require('./api');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// const cookieParser=require('cookie-parser');
// 跨域
app.use(cors());
app.use(express.json({limit: '5mb'}));


app.use(bodyParser.json());
//当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);

// 监听8089端口
app.listen(8089);
console.log('success listen 8089…………');