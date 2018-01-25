var express           = require('express'),
router                = express.Router(),
passport        = require('../app/config/passport'),
clickHandler          = require('../app/controllers/clickHandler.server.js'),
passportLocalMongoose = require('passport-local-mongoose');

isLoggedIn=(req, res, next)=>{
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
}

clickHandler = new clickHandler();
router.get('/',isLoggedIn,(req,res)=>{

   res.render('../views/index');

});
router.get('/login',(req,res)=>{
   res.render('../views/login');
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/login');
});

router.get('/profile',(req,res)=>{
    res.render('profile');
});

// router.get('/api/:id',isLoggedIn,(req,res)=>{
//    res.json(req.user.github);
// });

router.get('/auth/github',passport.authenticate('github'));
router.get('/auth/github/callback',passport.authenticate('github',{
   successRedirect:'/',failureRedirect:'/login'
}));

router.get('/api/click',isLoggedIn,clickHandler.getClicks);
router.post('/api/click',isLoggedIn,clickHandler.addClick);
router.delete('/api/click',isLoggedIn,clickHandler.resetClick);



module.exports = router;


