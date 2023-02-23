module.exports = function(req,res,next){
    res.locals.isAuth = req.session.isAuth;
    res.locals.role = req.session.role;
    next();
}