var router = require('express').Router();
var controller = require('./supporter.controller');
var authMiddleware = require('../../middlewares/auth');



router.get('/supporter',controller.getMain);
//post("/api/login/checkLogin"
router.post('/login/checkLogin', controller.login);

module.exports = router;