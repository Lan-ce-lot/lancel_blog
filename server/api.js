// "use strict";
const db = require('./db');
const express = require('express');
const router = express.Router();

const path = require('path');

// user
// 注册
router.post('/api/admin/signUp', (req, res) => {
    //是否重名
    db.User.find({name: req.body.name}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length > 0) {
            res.send({'status': 0, 'msg': '用户名已注册'});
        } else {
            let newUser = new db.User({
                name: req.body.name,
                password: req.body.password
            });
            newUser.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.send({'status': 200, 'msg': '注册成功'});

            })
        }
    })
})

// 登录
router.post('/api/admin/login', (req, res) => {
    console.log(req.body)
    db.User.find({name: req.body.name}, (err, docs) => {
        if (err) {
            res.send(err);
            return
        }
        if (docs.length === 1) {
            if (docs[0].password === req.body.password)
                res.send({'status': 200, 'msg': '登录成功'});
            else
                res.send({'status': 0, 'msg': '密码错误'});
        } else {
            res.send({'status': 0, 'msg': '账号不存在'});
        }
    })
})


// article
// 文章查看
router.get('/api/detail/:id', (req, res) => {
    db.Article.findOne({ _id: req.params.id }, function (err, docs) {
        if (err) {
            console.error(err)
            return
        }
        let prev = {};
        let next = {};
        db.Article.find({ '_id': { "$gt": req.params.id } }) //上一条
            .then(res2 => {
                if (res2.length > 0) {
                    prev.title = res2[0]["title"];
                    prev._id = res2[0]["_id"];
                }
                db.Article.find({ '_id': { "$lt": req.params.id } }) //下一条
                    .then(res3 => {
                        if (res3.length > 0) {
                            next.title = res3[res3.length - 1]["title"];
                            next._id = res3[res3.length - 1]["_id"];
                        }
                        let obj = JSON.parse(JSON.stringify(docs));
                        obj.prev = prev;
                        obj.next = next;
                        res.send(obj)
                    })
            })
            .catch(rej => {
                console.log(rej);
            });
    })
})
// 文章保存
router.post('/api/admin/saveArticle', (req, res) => {
    let newArticle = new db.Article(req.body.articleInformation);
    newArticle.save(function (err) {
        if (err)
            res.send(err);
        else
            res.send({'status': 200, 'msg': '保存成功'});
    })
})
// 文章删除
router.post('/api/admin/deleteArticle', (req, res) => {
    db.Article.remove({_id: req.body._id}, (err) => {
        if (err)
            res.status(500).send();
        else
            res.send({'status': 200, 'msg': '删除成功'});
    })
})
// 文章修改
router.post('/api/admin/updateArticle', (req, res) => {
    let article = new db.Article(req.body.articleInformation);
    db.Article.find({_id: article._id}, ((err, docs) => {
        if (err) {
            res.send(err);
        } else {
            docs[0].title = article.title;
            docs[0].date = article.date;
            docs[0].gist = article.gist;
            docs[0].content = article.content;
            docs[0].label = article.label;
            db.Article(docs[0]).save(function (err) {
                if (err)
                    res.status(500).send();
                else
                    res.send({'status': 200, 'msg': '更新成功'});
            })
        }
    }))
})

// 查询文章列表
router.get('/api/articleList', (req, res) => {
    db.Article.find({}, (err, docs) => {
        if (err) res.send(err);
        else res.send(docs);
    });
})

module.exports = router;