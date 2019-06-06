module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('login.vue'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // 1 - show the login form GET
    app.get('/login', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.vue', { message: req.flash('loginMessage') })
    });

    // 2 - process the login form POST
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages 
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // 3 - show the signup form
    app.get('/signup', function (req, res) {
        // render the page and pass in any flash data if it exists GET
        res.render('signup.ejs', { message: req.flash('loginMessage') })
    });

    // 4- process the signup form POST
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages 
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // 5 - show the profile page GET
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user:req.user
         });
    });
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    // get the user out of session and pass to template

    // =====================================
    // LOGOUT ==============================
    // =====================================
    // 6 - logout user GET
    app.get('/logout',function(req,res){
        req.logout();
        // redirect to root
        res.redirect('/');
    })
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}