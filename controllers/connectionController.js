//"C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"
const express = require('express');
const model=require('../models/connection');
const User = require('../models/user');
const RSVP = require('../models/rsvp');

//CRUD- Create(newConnection),Read(get)   , Update(put), Delete

//exports.index=(req,res)=>{
    //res.send(model.find());
//    let connections=model.find();
 //   res.render('./connection/index',{connections});//looks at views folder automatically
//};

exports.index = (req, res, next)=>{
    //res.send('send all stories');
    model.find()
    .then(connections=>res.render('./connection/index', {connections}))
    .catch(err=>next(err));
};

////CREATE 
//GET /newConnection
//POST /newConnection

//GET /stories/new:send html form  
//GET /newConnection
exports.new=(req,res)=>{
    res.render('./connection/newConnection');
}

//POST /stories:create new story
//POST /newConnection

exports.create = (req, res, next)=>{
    //res.send('Created a new story');
    //let story = new model(req.body);//create a new story document
    let connection=new model(req.body);//req.body;//create a new connection object
    connection.author=req.session.user;
    connection.save()//insert the document to the database
    .then(connection=> res.redirect('/connections'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message); 
            err.status = 400;
        }
        next(err);
    });
    
};

/*
exports.create=(req,res)=>{
    //res.send('Created a new story');
    console.log(req.body);
    let connection=req.body;
    model.save(connection);
    res.redirect('/connections');

};
*/

///READ 
//GET /connections
//GET /connections/:id

//GET /connections
exports.connections=(req,res)=>{
    //res.send(model.find());
    let connections=model.find();
    res.render('./connections',{connections});//looks at views folder automatically
};

/*
exports.connections=(req,res,next)=>{
    let id=req.session.user;

    User.findById(id)
    .then(user=>res.render('./user/profile',{user}))
    .catch(err=>next(err));
    //res.render('login');
};
*/


//GET /connections/:id
/*
exports.show=(req,res,next)=>{
    //res.send('send story with ID: '+ req.params.id)
    //need to return details of story
    let id=req.params.id;
    let connection=model.findById(id);
    //res.send(story);
    if(connection){
     res.render('./connection/connection',{connection});   
    }
    let err =new Error('Cannot find story with ID: ' + id);
        err.status=404;
        next(err)
    
};

//GET /connections/:id
*/
exports.show = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    /*
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    */
   // User.find({id: req.session.user})
   /*
    Promise.all([model.findById(id).populate('author','firstName lastName'),User.find({id: req.session.user})]) 
    .then(connection=>{
        if(connection){
        const[connections,user]=connection;
        res.render('./connection/connection', {connections,user})
        }else{
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err); 
        }
    })
        
    .catch(err=>next(err));
    */

    
    model.findById(id).populate('author','firstName lastName')
    .then(connection=>{
        if(connection) {
            return res.render('./connection/connection', {connection});
        } else {
            req.flash('error', 'Cannot find a connection with id ');
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
    
};


//UPDATE 
//GET /posts/:id/edit
//PUT|PATCH /posts/:id

//GET /stories/:id/edits:send html form for editing an id
/*
exports.edit=(req,res,next)=>{
    //res.send('send the edit form');
    let id=req.params.id;
    let connection=model.findById(id);
    if(connection){
        res.render('./connection/edit',{connection});

    }
    else{
        let err =new Error('Cannot find story with ID: ' + id);
        err.status=404;
        next(err)
    }
};
*/

//GET /connections/:id/edits:send html form for editing an id
exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let firstName=req.session.user.firstName;
    let lastName=req.session.user.firstName;
    let name='Tom';
    /*
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    */


    model.findById(id)
    .then(connection=>{
        if(connection) {
            req.flash('success', 'You have successfully edited the connection');
            return res.render('./connection/edit', {connection});
        } else {
            req.flash('error', 'Cannot find a connection with id ');
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};



//PUT
/*
//PUT /stories/:id : update the story identified by id
exports.update=(req,res,next)=>{
    //res.send('update story with ID: '+ req.params.id)
    let story=req.body;
    console.log(story);
    let id=req.params.id;
    if(model.updateById(id,story)){
        res.redirect('/connections/'+id);
    }else{
        let err =new Error('Cannot find story with ID: ' + id);
        err.status=404;
        next(err)
    }
    console.log(story);
};
*/

////PUT /stories/:id : update the connection identified by id
exports.update = (req, res, next)=>{
    let connection= req.body;
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

    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true}).populate('author','firstName lastName')
    .then(connection=>{
        if(connection) {
            res.redirect('/connections/'+id);
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            req.flash('error','Cannot find a connection with id ');  
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



//DELETE /posts/:id
//DELETE /stories/:id, delete the story identified by ID
/*
exports.delete=(req,res,next)=>{
    // res.send('delete story with id' + req.params.id);
    let id=req.params.id;;
    if(model.deleteById(id)){
        res.redirect('/connections');
    }
    else{
     let err =new Error('Cannot find story with ID: ' + id);
         err.status=404;
         next(err)
    }
 
 };
 */
//DELETE /stories/:id, delete the story identified by ID
 exports.delete = (req, res, next)=>{
    let id = req.params.id;

    /*
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    */

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(story =>{
        if(story) {
            res.redirect('/connections');
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};
 

//RSVP
//create
exports.rsvp = (req, res, next)=>{
    //res.send('Created a new story');
    //let story = new model(req.body);//create a new story document
    let connection=new model(req.body);//req.body;//create a new connection object
    let connectionID=req.params.id;
    let rsvp_Going=req.params.Going;
    let rsvp_Author=req.session.user;
    let rsvp =new model();
    rsvp.Going=rsvp_Going;
    rsvp.CreatedByUser=rsvp_Author;
    rsvp.CreatedInConnection=connectionID;
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
//UpdateRSVP
exports.updateRSVP = (req, res, next)=>{
    //here if I click the button, the body should be 
    //I can add a param , Going =yes, no, maybe
    //I also need connection id, which is req.params.id
    //I also need user id, which should be req.session.user
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
//delete RSVP
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
 
