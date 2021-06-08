const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const BlogPost = require('../model/BlogPost');

const User = require("../model/User");

router.get('/all-posts', async function(req,res){
  var blogPosts =  await BlogPost.find();
  res.render('../views/partials/allPosts.ejs', {blogPosts});
});

router.get('/',async function(req,res){
    //console.log("User id: " + req.userId);
    res.render('index',{title: 'home'});
});

router.get('/newPost', async function(req,res){
  res.render('newPost');
});
// NEW POST
// 3 -> Ir a newPost.ejs y dar de alta action y method
router.post('/newPost', async (req,res) =>{
    var blogPost = new BlogPost(req.body);
    await blogPost.save();
    res.redirect('/');
  });

// EDIT POST
// 5 -> Ir a edit.ejs y dar de alta action y method
router.get('/edit/:id', async (req,res) =>{
  var blogPost = await BlogPost.findById(req.params.id);
  res.render('../views/editPost', {blogPost});
});

// 7
router.post('/edit/:id',   async(req,res) =>{
  var id = req.params.id;
  await BlogPost.updateOne({_id: id},req.body );
  res.redirect('/');
});

// 8
router.get('/delete/:id',  async (req,res) =>{
  var blogPost = await BlogPost.findById(req.params.id);
  res.render('delete', {blogPost});

})

//9
router.post('/delete/:id',   async(req,res) =>{
  var id = req.params.id;
  await BlogPost.deleteOne({_id: id});
    res.redirect('/');
});

router.get('/single/:id', async (req,res) =>{
  var blogPost = await BlogPost.findById(req.params.id);
  res.render('../views/singlePost.ejs', {blogPost});
});

module.exports = router;