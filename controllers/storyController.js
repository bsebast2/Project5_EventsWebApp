//include all callback functions in the routes
const express = require('express');
const model=require('../models/story');

exports.index=(req,res)=>{
    //res.send(model.find());
    let stories=model.find();
    res.render('./story/index',{stories});//looks at views folder automatically
};

//GET /stories/new:send html form
exports.new=(req,res)=>{
    //res.send('send the new form')
    res.render('./story/new');
};

//POST /stories:create new story
exports.create=(req,res)=>{
    //res.send('Created a new story');
    console.log(req.body);
    let story=req.body;
    model.save(story);
    res.redirect('/stories');

};

//GET /stories/:id
exports.show=(req,res,next)=>{
    //res.send('send story with ID: '+ req.params.id)
    //need to return details of story
    let id=req.params.id;
    let story=model.findById(id);
    //res.send(story);
    if(story){
     res.render('./story/show',{story});   
    }
    let err =new Error('Cannot find story with ID: ' + id);
        err.status=404;
        next(err)
    
};

//GET /stories/:id/edits:send html form for editing an id
exports.edit=(req,res,next)=>{
    //res.send('send the edit form');
    let id=req.params.id;
    let story=model.findById(id);
    if(story){
        res.render('./story/edit',{story});

    }
    else{
        let err =new Error('Cannot find story with ID: ' + id);
        err.status=404;
        next(err)
    }
};

//PUT /stories/:id : update the story identified by id
exports.update=(req,res,next)=>{
    //res.send('update story with ID: '+ req.params.id)
    let story=req.body;
    let id=req.params.id;
    if(model.updateById(id,story)){
        res.redirect('/stories/',id);
    }else{
        let err =new Error('Cannot find story with ID: ' + id);
        err.status=404;
        next(err)
    }
    console.log(story);
};

//DELETE /stories/:id, delete the story identified by ID
exports.delete=(req,res,next)=>{
   // res.send('delete story with id' + req.params.id);
   let id=req.params.id;;
   if(model.deleteById(id)){
       res.redirect('/stories');
   }
   else{
    let err =new Error('Cannot find story with ID: ' + id);
        err.status=404;
        next(err)
   }

};

