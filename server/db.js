// "use strict";
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true, useUnifiedTopology: true });
// mongodb://username:password@host:port/
// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));

// user
const userSchema = new mongoose.Schema({
    name: String,
    password: String
})

// article
const articleSchema = new mongoose.Schema({
    title: String,
    date: String,
    content: String,
    gist: String,
    // 留个坑
    label: Array,
    comments: Array
})

const Models = {
    User: mongoose.model('User', userSchema),
    Article: mongoose.model('Article', articleSchema)
}

module.exports = Models;
