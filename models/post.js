'use strict';

var Sequelize = require('sequelize');
var db = new Sequelize('learning_node', "root", "root", {
    dialect: 'mysql'
})

var Post = db.define('post', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.TEXT
    },
    visible: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Post

//Synce create table and push data to database
/*Post.sync().then(function(){
    var data = {
        title: 'Hello Sequelize',
        content: 'Fill this in later'
    }

    Post.create(data).then(function(post){
        console.dir(post.get())
    })
})*/