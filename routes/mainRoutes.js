const express =require('express');
const controller=require('../controllers/MainController');
const router=express.Router();

router.get('/',controller.index);
router.get('/contact',controller.contact);
router.get('/about',controller.about);
//router.get('/',controller.new);
module.exports=router;