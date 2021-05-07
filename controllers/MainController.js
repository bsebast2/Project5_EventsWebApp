const express = require('express');


//GET /stories/new:send html form
exports.index=(req,res)=>{
    //res.send('send the new form')
    res.render('./');
};

//GET /stories/new:send html form
exports.contact=(req,res)=>{
    //res.send('send the new form')
    res.render('./contact');
};

//GET /stories/new:send html form
exports.about=(req,res)=>{
    //res.send('send the new form')
    res.render('./about');
};
