const {Router} = require('express');
const controller = require('../controllers/controller.js');
const router = Router();
router.get('/',controller.loadHomepage);
router.post('/register',controller.register);
router.post('/login',controller.login);
module.exports=router;
