const express= require('express');

const router= express.Router();

console.log('router loaded');

const homeController= require('../controllers/home_controller');


router.get('/',homeController.home);
router.use('/user', require('./users'));
router.use('/post', require('./post'));
router.use('/comments', require('./comment'));

router.use('/api',require('./api'));

module.exports=router;