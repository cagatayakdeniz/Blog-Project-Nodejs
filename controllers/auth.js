const User = require("../models/user");
const Role = require("../models/role");
const bcrypt = require("bcrypt");
const mail = require("../helpers/send-email");
const config = require("../config");
const crypto = require("crypto");
const { Op } = require("sequelize");

exports.get_register = async(req,res)=>{
    try {
        res.render("auth/register");
    } catch (error) {
        console.log(error);
    }
}

exports.post_register = async(req,res)=>{
    const adsoyad = req.body.adsoyad;
    const email = req.body.email;
    const sifre = req.body.sifre;

    const hashedSifre = await bcrypt.hash(sifre,10);

    try {
        throw new Error("a");
        await User.create({
            adsoyad:adsoyad,
            email:email,
            sifre:hashedSifre
        });

        mail.sendMail({
            from: config.mail.from,
            to: email,
            subject: "Hesap oluşturuldu",
            text: "Hesabınız başarılı bir şekilde oluşturuldu"
        });

        res.redirect("login");
    } catch (error) {
        let msg = "";
        if(error.name.includes('Sequelize')){
            console.log(error.name);
            error.errors.forEach(err => {
                msg += err.message+" "
            });
            
            res.render("auth/register",{
                message: msg
            })
        }
        else{
            res.redirect("/500");
        }
    }
}

exports.get_login = async(req,res)=>{
    try {
        res.render("auth/login");
    } catch (error) {
        console.log(error);
    }
}

exports.post_login = async(req,res)=>{
    const email = req.body.email;
    const sifre = req.body.sifre;

    const userKontrol = await User.findOne({where:{email:email}});
    try {
        if(!userKontrol){
            return res.render("auth/login",{
                message:"e-mail adresi hatalı",
                csrfToken: req.csrfToken()
            });
        }

        const sifreKontrol = await bcrypt.compare(sifre,userKontrol.sifre);

        if(!sifreKontrol){
            return res.render("auth/login",{
                message:"sifre hatalı",
                csrfToken: req.csrfToken()
            });
        }

        const role = await Role.findOne({where:{id:userKontrol.roleid}});
        req.session.isAuth = true;
        req.session.role = role.roleName;

        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

exports.get_logout = async(req,res)=>{
    try {
        req.session.destroy();
        return res.redirect("/auth/login");
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_reset_password = async(req,res)=>{
    try {
        res.render("auth/reset-password",{
            csrfToken: req.csrfToken()
        });
    } catch (error) {
        console.log(error);
    }
}

exports.post_reset_password = async(req,res)=>{
    const email = req.body.email;
    try {
        var token = crypto.randomBytes(32).toString("hex");
        const user = await User.findOne({where:{email:email}});
        console.log(user);
        if(!user){
            console.log("Kullanıcı bulunamadı.");
            return res.redirect("/auth/reset-password");
        }

        user.resetToken = token;
        user.resetTokenExpirationTime = Date.now() + (1000 * 60 * 60 * 24);
        await user.save();

        mail.sendMail({
            from: config.mail.from,
            to: user.email,
            subject: "Reset Password",
            html: `
                <p>Parolanızı güncellemek için aşağıdaki linke tıklayınız.</p>
                <p>
                    <a href="http://127.0.0.1:3000/auth/new-password/${token}">Parola Sıfırla</a>
                </p>
            `
        });

        return res.redirect("/auth/register");
    } catch (error) {
        console.log(error);
    }
}

exports.get_new_password = async(req,res)=>{
    var token = req.params.token;
    console.log(token);

    try {
        const user = await User.findOne({
            where:{
                resetToken: token,
                resetTokenExpirationTime:{
                    [Op.gt]: Date.now()
                }
            }
        })
        console.log(token);
        console.log(user.id);
        return res.render("auth/new-password",{
            userid: user.id,
            token: token,
            csrfToken: req.csrfToken()
        });
    } catch (error) {
        console.log(error);
    }
}

exports.post_new_password = async(req,res)=>{
    const userid = req.body.userid;
    const yeniSifre = req.body.sifre;
    const token = req.body.token;
    console.log("aaASDAUYSFHAKSLJD");
    try {
        const user = await User.findOne({
            where:{
                resetToken: token,
                resetTokenExpirationTime:{
                    [Op.gt]: Date.now()
                },
                id:userid
            }
        });
        
        user.sifre = await bcrypt.hash(yeniSifre,10);
        user.resetToken = null;
        user.resetTokenExpirationTime = null;
        await user.save();
        
        return res.redirect("/auth/login");
    } catch (error) {
        console.log(error);
    }
}