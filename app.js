var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    Download              = require("./models/download"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    transmission          = require("transmission"); //for checking extensions of files
    var transmission = new transmission({  host: 'localhost', port: 9091});

mongoose.connect("mongodb://localhost/indra");
mongoose.Promise = require('bluebird');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "tHIsiSaSECrEtPasSWOrd",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
    res.render("index");
});


app.get("/download",isLoggedIn,function(req, res) {
   res.render("download");
});

app.post("/download",isLoggedIn,function(req, res) {
    var link=req.body.link,
        name=req.body.file_name,
        category=req.body.category;
    console.log(link+" "+name+" "+category);
    console.log(req.user);
    console.log(req.connection.remoteAddress);
    
    /*transmission.addUrl('url', {"download-dir":"/torrents"},function(err, arg){
        console.log(err);
        
    });*/
    res.render("download");
    //res.send("Here torrent page will be rendered showing status of torrent with URL: "+res.body.link);    
});

//show sign up form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handling user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/download");
        });
    });
});

app.get("/login",function(req, res) {
   return res.render("login"); 
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/download",
    failureRedirect: "/login"
}) ,function(req, res){
    
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started.......");
})