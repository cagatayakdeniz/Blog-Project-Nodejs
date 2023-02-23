const Blog = require("../models/blog");
const Category = require("../models/category");
const { Op } = require("sequelize");

exports.get_index = async(req,res)=>{
    try{
        const blogs = await Blog.findAll({
            where: {
                [Op.and]: [{anasayfa:true}, {onay:true}]
            }
        });
        const categories = await Category.findAll();

        res.render("users/index",{
            title: 'Popüler Kurslar',
            categories: categories,
            blogs: blogs,
            selectedCategory: null
        });
    }
    catch(err){
        console.log(err);
    }
}

exports.get_blogs = async(req,res)=>{
    try{
        const blogs = await Blog.findAll();
        const categories = await Category.findAll();

        res.render("users/blogs",{
            title: 'Tüm Kurslar',
            categories: categories,
            blogs: blogs,
            selectedCategory: null
        });
    }
    catch(err){
        console.log(err);
    }
}

exports.get_blogs_with_blogid = async(req,res)=>{
    const blogId = req.params.blogid;

    try {
        const blog = await Blog.findOne(
            {
                where: { 
                    blogid:blogId 
                }
            });

        if(blog){
            return res.render("users/blog-detail",{
                blog: blog.dataValues
            });
        }
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

exports.get_blogs_with_categoryid = async(req,res)=>{
    const categoryId = req.params.categoryid;  

    try {
        const blogs = await Blog.findAll(
            {
                where: { 
                    categoryId: categoryId 
                }
            });
        const categories = await Category.findAll();

        res.render("users/blogs",{
            title: 'Kurslar',
            categories: categories,
            blogs: blogs,
            selectedCategory: categoryId
        })
    } catch (error) {
        console.log(error);
    }
}