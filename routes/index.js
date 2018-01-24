var express     = require('express'),
router      = express.Router(),
Click       = require('../models/click'),
passport    = require('passport'),
clickHandler      = require('../app/controllers/clickHandler.server.js');

passportLocalMongoose = require('passport-local-mongoose');

clickHandler = new clickHandler();
router.get('/',(req,res)=>{

   res.render('../views/index');

});
router.get('/api/click',clickHandler.getClicks);
router.post('/api/click',clickHandler.addClick);
router.delete('/api/click',clickHandler.resetClick);
module.exports = router;


