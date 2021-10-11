const express= require('express');

const router= express.Router();


const userController= require('../controllers/user_controller');

router.get('/',userController.default);
router.get('/profile',userController.profile);
router.get('/like',userController.like);
router.get('/sign_in',userController.signin);
router.get('/sign_up',userController.sign_up);
router.post('/create',userController.create);

module.exports=router;