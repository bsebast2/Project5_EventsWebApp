const express =require('express');
const controller=require('../controllers/storyController');
const router=express.Router();

//router.get('/',controller.index);

//GET /stories/new:send html form
//router.get('/new',controller.new);

//POST /stories:create new story
//router.post('/',controller.create);

//GET /stories/:id
//router.get('/:id',controller.show);

//GET /stories/:id/edits:send html form for editing an id
//router.get('/:id/edit',controller.edit);

//PUT /stories/:id : update the story identified by id
//router.put(':/id',controller.update);

//DELETE /stories/:id, delete the story identified by ID
//router.delete('/:id',controller.delete);

module.exports=router;