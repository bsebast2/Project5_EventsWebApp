const express =require('express');
const controller=require('../controllers/rsvpController');
const {validateId}=require('../middlewares/validator')
const {isLoggedIn,isAuthor}=require('../middlewares/auth');

const router = express.Router();

//rsvp
router.get('/',validateId,controller.index);
//outer.get('/:id',validateId,controller.showRSVP);

router.post('/',validateId,controller.createRSVP);

//PUT /connectins/:id : update the story identified by id
router.put('/:id',validateId,isLoggedIn, isAuthor,controller.updateRSVP);

router.delete('/:id',validateId,controller.deleteRSVP);

//with rsvp. we need a cuple of functions
//get RSVP. Function to find() all rsvps for one user, can find this in

module.exports=router;