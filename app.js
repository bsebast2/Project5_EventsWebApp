//require modules
const express=require('express');
const morgan=require('morgan');
const methodOverride=require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const mainRoutes=require('./routes/mainRoutes');
const connectionRoutes=require('./routes/connectionRoutes');
const storyRoutes=require('./routes/storyRoutes');
const userRoutes = require('./routes/userRoutes');
const rsvpRoutes = require('./routes/rsvpRoutes');
//const session=require('express-session')
//const User=require('./models/user');
//const MongoStore=require('connect-mongo');
//const flash =require('connect-flash');
//create  app
const app=express();


//configure app
let port=3000;
let host='localhost';

app.set('view engine','ejs');

//connect to database
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/demos', 
                {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

//mount middleware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/demos'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    res.locals.user=req.session.user||null;
    //console.log(req.session);
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static('public'));//show static files
app.use(express.urlencoded({extended:true}));//upload data from URL
app.use(morgan('tiny'));//records req and res in terminal
app.use(methodOverride('_method'));


//set up routes
//app.get('/',(req,res)=>{
//   res.render('index');
//});
app.use('/',mainRoutes);
app.use('/stories',storyRoutes);
app.use('/connections',connectionRoutes);
app.use('/users', userRoutes);
app.use('/rsvp', rsvpRoutes);


app.use((req,res,next)=>{
    let err=new Error('The server cannot locate'+ req.url);
    err.status=404;
    next(err);
})

app.use((err,req,res,next)=>{
    console.log(err.stack);
    if(!err.status){
       err.status=500;
       err.message=("Internal Server Error");
   } 
   res.status(err.status);
   res.render('error',{error:err});
});

//start the server
//app.listen(port,host,()=>{ console.log('Server is running on port',port);})
