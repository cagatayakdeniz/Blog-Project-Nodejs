module.exports = function(req,res,next){
    if(req.session.role != "Admin" && req.session.role != "Moderator"){
        return res.redirect("/auth/login");
    }
    next();
}