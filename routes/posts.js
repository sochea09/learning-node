
"use strict";

var models = require('../models');
var global = require('../routes/global');

var express = require('express');
var router = express.Router();
var co = require('co');

//get all posts
router.get('', function(req, res){
    models.Post.findAll({
        attributes: ['id', 'title'],
        where: { visible: true },
        order: '"createdAt" DESC'
    }).then(function (posts) {
            //show data to console
            posts.forEach(global.log)
            res.json(global.success(posts,''))
    })
})
co.wr
//get post details
router.get('/:id', co.wrap(function* (req, res){
    try{
        let posts = yield models.Post.find({where: {id: req.params.id}});
        res.json(global.success(posts,''));
    } catch(ex) {
        res.send(401, global.fail('', 'Post not found.'))
    }
}))

//create post
router.post('', function(req, res){
    var title = req.body.title;
    var content = req.body.content;

    models.Post.create({title: title, content: content}).then(function(posts){
        res.send(201, global.success(posts,'Post created.'))
    })

})

//update post
router.post('/:id', function(req, res){
    var id = req.params.id;
    var title = req.body.title;
    var content = req.body.content;

    models.Post.update({title: title, content: content},{id: id}).then(function(){
        res.send(global.success('', 'Post updated!'))
    })

})

//delete post
router.post('/:id/delete', function(req, res){
    models.Post.update({visible: 0},{id: req.params.id}).then(function(){
        res.send(global.success('', 'Post delete!'))
    })
})

module.exports = router;

