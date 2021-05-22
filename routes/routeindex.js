const { render } = require('ejs');
const express = require('express');
const router = express.Router();



const User = require("../model/User");

router.get('/',async function(req,res){
    //console.log("User id: " + req.userId);
    res.render('index',{title: 'home'});
});


module.exports = router;