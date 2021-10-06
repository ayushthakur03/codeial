const express= require('express');

const router= express.Router();


const userController= require('../controllers/user_controller');

router.get('/',userController.default);
router.get('/profile',userController.profile);
router.get('/like',userController.like);

module.exports=router;