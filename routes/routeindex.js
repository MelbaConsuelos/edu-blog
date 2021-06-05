const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const BlogPost = require('../model/BlogPost');




const User = require("../model/User");

router.get('/',async function(req,res){
    //console.log("User id: " + req.userId);
    res.render('index',{title: 'home'});
});

router.get('/newPost', async function(req,res){
  res.render('newPost');
});

// 3 -> Ir a newPost.ejs y dar de alta action y method
router.post('/newPost', async (req,res) =>{
    var blogPost = new BlogPost(req.body);
    await blogPost.save();
    res.redirect('/');
  });


module.exports = router;