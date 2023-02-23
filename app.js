const express = require("express");
const path = require("path");
const app = express();
const session = require('express-session');
const csrf = require('csurf');
const locale = require("./middlewares/locale");

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'cagatay ayaz',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 24
    }
}));
app.use(locale);
app.use(csrf());

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");

app.use('/admin',adminRouter);
app.use('/auth',authRouter);
app.use(userRouter);


app.use('/libs', express.static(path.join(__dirname + '/node_modules')));
app.use('/static', express.static(path.join(__dirname + '/public')));

app.use((req,res)=>{
    res.status(500).render("error/error-500");
})

app.listen(3000,()=>{
    console.log("Server at port:3000");
});