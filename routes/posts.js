const express= require('express');
const router= express.Router();

const postsController= require('../controllers/post_controller');

router.get('/',postsController.postzz);
router.get('/comment',postsController.comment);

module.exports=router;