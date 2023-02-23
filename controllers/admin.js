const Blog = require("../models/blog");
const Category = require("../models/category");
const Role = require("../models/role");
const User = require("../models/user");
const sequelize = require("../data/data")

exports.get_blog_delete_blogid = async(req,res)=>{
    const blogId = req.params.blogid

    try {
        await Blog.destroy({
            where: {
                blogid: blogId
            }
        });

        res.redirect("/admin/blog-list?action=delete");
    } catch (error) {
        console.log(error);
    }
}

exports.get_category_delete_categoryid = async(req,res)=>{
    const categoryId = req.params.categoryid
    const blogs = Blog.findAll({where:{categoryId:categoryId}});

    blogs.then(result=>result.forEach(x=>{
        const blogid = x.dataValues.blogid
        Blog.destroy({where:{blogid:blogid}});
    }));
    
    try {
        await Category.destroy({
            where: {
                categoryid: categoryId
            }
        });

        res.redirect("/admin/category-list?action=delete");
    } catch (error) {
        console.log(error);
    }
}

exports.get_blog_with_blogid = async(req,res)=>{
    const blogId = req.params.blogid;
    try {
        const blog = await Blog.findOne({
            where: {
                blogid: blogId
            }
        });

        const categories = await Category.findAll();
        res.render("admin/blog-edit",{
            blog:blog.dataValues,
            categories: categories
        });
    } catch (error) {
        log(error);
    }
}

exports.get_category_with_categoryid = async(req,res)=>{
    const categoryId = req.params.categoryid;
    try {
        const category = await Category.findOne({
            where: {
                categoryid: categoryId
            }
        });

        res.render("admin/category-edit",{
            category:category.dataValues,
        });
    } catch (error) {
        log(error);
    }
}

exports.post_category_with_categoryid = async(req,res)=>{
    const categoryid = req.body.categoryid;
    const ad = req.body.ad;
    console.log(req.body);
    try {
        await Category.update({
            name: req.body.ad
        },{
            where: {
                categoryid: categoryid
            }
        });

        res.redirect("/admin/category-list?action=update");
    } catch (error) {
        console.log(error);
    }
}

exports.post_blog_with_blogid = async(req,res)=>{
    const blogid = req.body.blogid;
    const baslik = req.body.baslik;
    const aciklama = req.body.aciklama;
    let resim = req.body.resim;
    if(req.file){
        resim = req.file.filename;
    }

    const categoryid = req.body.kategori;
    const anasayfa = req.body.anasayfa == "on"?1:0;
    const onay = req.body.onay == "on"?1:0;

    try {
        const updatedBlog = await Blog.findByPk(blogid);
        if(updatedBlog){
            updatedBlog.baslik = req.body.baslik;
            updatedBlog.aciklama = req.body.aciklama;
            updatedBlog.resim = req.body.resim;
            if(req.file){
                updatedBlog.resim = req.file.filename;
            }

            updatedBlog.categoryid = req.body.kategori;
            updatedBlog.anasayfa = req.body.anasayfa == "on"?1:0;
            updatedBlog.onay = req.body.onay == "on"?1:0;

            await updatedBlog.save();
            return res.redirect("/admin/blog-list?action=update");
        }        
    } catch (error) {
        console.log(error);
    }
}

exports.get_category_create = async(req,res)=>{
    try {
        const categories = await Category.findAll();

        res.render("admin/category-create",{
            categories: categories
        });
    } catch (error) {
        console.log(error);
    }
}

exports.post_category_create = async(req,res)=>{
    try {
        const ad = req.body.ad;

        await Category.create({
            name: ad
        });

        res.redirect('/admin/category-list?action=add');
    } catch (error) {
        console.log(error);
    }
}

exports.get_blog_create = async(req,res)=>{
    try {
        const categories = await Category.findAll();
        res.render("admin/blog-create",{
            categories: categories
        });
    } catch (error) {
        console.log(error);
    }
}

exports.post_blog_create = async(req,res)=>{
    const categories = await Category.findAll();
    try {
        await Blog.create({
            baslik: req.body.baslik,
            aciklama: req.body.aciklama,
            resim: req.file.filename,
            categoryId: req.body.kategori,
            anasayfa: req.body.anasayfa == "on" ? 1:0,
            onay: req.body.onay == "on" ? 1:0,
            eklenmeTarihi: Date.now()
        });

        res.redirect('/admin/blog-list?action=add');
    } catch (error) {
        let msg = "";
        if(error.name.includes('Sequelize')){
            console.log(error.name);
            error.errors.forEach(err => {
                msg += err.message+" "
            });
            
            res.render("admin/blog-create",{
                message: msg
            })
        }
        else{
            res.redirect("/500");
        }     
    }
}

exports.get_blog_list = async(req,res)=>{
    try {
        const blogs = await Blog.findAll();
        res.render("admin/blog-list",{
            blog:blogs,
            action: req.query.action
        });
    } catch (error) {
        console.log(error);
    }
}

exports.get_category_list = async(req,res)=>{
    try {
        const categories = await Category.findAll();
        console.log(categories);
        res.render("admin/category-list",{
            category:categories,
            action: req.query.action
        });
    } catch (error) {
        console.log(error);
    }
}

exports.get_roles_delete_user_userid = async(req,res)=>{
    const userid = req.params.userid

    try {
        const user = await User.findOne({where:{id:userid}});
        const roleid = user.roleid;

        user.roleid = null;

        await user.save();

        res.redirect("/admin/roles/"+roleid);
    } catch (error) {
        console.log(error);
    }
}

exports.get_roles_delete_roleid = async(req,res)=>{
    const roleid = req.params.roleid

    try {
        await Role.destroy({where:{id:roleid}});

        res.redirect("/admin/roles");
    } catch (error) {
        console.log(error);
    }
}

exports.get_role_with_roleid = async(req,res)=>{
    const roleid = req.params.roleid

    try {
        const roles = await Role.findOne({where:{id:roleid}});
        const users = await User.findAll({where:{roleid: roleid}});

        res.render("admin/role-edit",{
            roles:roles,
            users:users
        });
    } catch (error) {
        console.log(error);
    }
}

exports.post_role_with_roleid = async(req,res)=>{
    const roleid = req.params.roleid;
    const roleName = req.body.roleName;
    try {
        const role = await Role.findOne({where:{id:roleid}});

        role.roleName = roleName;
        await role.save();

        res.redirect("/admin/roles");
    } catch (error) {
        console.log(error);
    }
}

exports.get_roles = async(req,res)=>{
    try {
        const roles = await sequelize.query("SELECT blogdb.roles.id,blogdb.roles.roleName,count(blogdb.users.id) AS USER_COUNT FROM blogdb.roles JOIN blogdb.users ON blogdb.roles.id=blogdb.users.roleid GROUP BY blogdb.roles.id,blogdb.roles.roleName");

        res.render("admin/roles",{
            roles: roles[0]
        });
    } catch (error) {
        console.log(error);
    }
}

exports.get_user_with_userid = async(req,res)=>{
    const userid = req.params.userid
    try {
        const roles = await Role.findAll();

        res.render('admin/user-edit',{
            roles:roles,
            userid:userid
        });
    } catch (error) {
        console.log(error);
    }
}

exports.get_users = async(req,res)=>{
    try {
        const users = await sequelize.query("SELECT blogdb.users.id,blogdb.users.adsoyad,blogdb.users.email,blogdb.roles.id as roleid,blogdb.roles.roleName FROM blogdb.users JOIN blogdb.roles ON blogdb.users.roleid=blogdb.roles.id");

        res.render('admin/users',{
            users: users[0]
        });
    } catch (error) {
        console.log(error);
    }
}