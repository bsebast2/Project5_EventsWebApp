const express = require('express');
const model=require('../models/connection');
const User = require('../models/user');
const rsvp = require('../models/rsvp');

exports.index = (req, res, next)=>{
    //res.send('send all stories');
    model.find()
    .then(rsvp=>res.render('./connection/index', {rsvp}))
    .catch(err=>next(err));
};


//post
//POST /stories:create new story
//POST /newConnection

exports.createRSVP = (req, res, next)=>{
    //res.send('Created a new story');
    //let story = new model(req.body);//create a new story document
    let rsvp=new model(req.body);//req.body;//create a new connection object
    rsvp.CreatedByUser=req.session.user;
    //rsvp_CreatedInConnection
    rsvp.save()//insert the document to the database
    .then(rsvp=> res.redirect('/connections'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message); 
            err.status = 400;
        }
        next(err);
    });
    
};

//update
exports.updateRSVP = (req, res, next)=>{
    let rsvp= req.body;
    let id = req.params.id;
    //let id=req.session.user;
    
    //let name= req.author.host_name;
    /*
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        req.flash('success', 'You have successfully logged in');
        err.status = 400;
        return next(err);
    }
    */

    model.findByIdAndUpdate(id, rsvp, {useFindAndModify: false, runValidators: true}).populate('author','firstName lastName')
    .then(rsvp=>{
        if(rsvp) {
            res.redirect('/connections/'+id);
        } else {
            let err = new Error('Cannot find a rsvp with id ' + id);
            req.flash('error','Cannot find a rsvp with id ');  
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> {
        if(err.name === 'ValidationError')
            req.flash('error', err.message);  
            err.status = 400;
        next(err);
    });
};

//DELETE /stories/:id, delete the story identified by ID
exports.deleteRSVP = (req, res, next)=>{
    let id = req.params.id;

    /*
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    */

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(rsvp =>{
        if(rsvp) {
            res.redirect('/connections');
        } else {
            let err = new Error('Cannot find a rsvp with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};
 