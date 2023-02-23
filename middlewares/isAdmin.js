module.exports = function(req,res,next){
    if(req.session.role != "Admin"){
        return res.redirect("/auth/login");
    }
    next();
}